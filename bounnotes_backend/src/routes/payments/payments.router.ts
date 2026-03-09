import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import {
  findNoteRowById,
  hasUserPurchasedNote,
  createPurchase,
} from "../notes/notes.repository";
import {
  createPaymentSession,
  findPaymentSessionByConversationId,
  markPaymentSessionFailed,
  markPaymentSessionSuccess,
} from "./payments.repository";
import iyzico from "../../config/iyzico";
import { env } from "../../config/env";

const paymentsRouter = Router();

paymentsRouter.post("/checkout", requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const noteId = Number(req.body?.noteId);
    if (!Number.isInteger(noteId) || noteId <= 0) {
      return res.status(400).json({ message: "Invalid noteId" });
    }

    const noteRow = await findNoteRowById(noteId);
    if (!noteRow) {
      return res.status(404).json({ message: "Note not found" });
    }

    const ownerId = Number(noteRow.owner_id);
    if (ownerId === req.user.id) {
      return res.status(403).json({ message: "You can not buy your own note" });
    }

    if (!noteRow.is_listed) {
      return res.status(400).json({ message: "Note is not listed" });
    }

    const alreadyPurchased = await hasUserPurchasedNote(noteId, req.user.id);
    if (alreadyPurchased) {
      return res.status(409).json({ message: "Note already purchased" });
    }

    const amount = Number(noteRow.price);
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid note price" });
    }

    const conversationId = `note-${noteId}-buyer-${req.user.id}-${Date.now()}`;
    const paidPrice = amount.toFixed(2);

    const request = {
      locale: "tr",
      conversationId,
      price: paidPrice,
      paidPrice,
      currency: "TRY",
      basketId: `note-${noteId}`,
      paymentGroup: "PRODUCT",
      callbackUrl: `${env.BACKEND_BASE_URL}/api/payments/callback`,
      enabledInstallments: [1],
      buyer: {
        id: String(req.user.id),
        name: req.user.username || "User",
        surname: "User",
        gsmNumber: "+905350000000",
        email: req.user.email || "test@example.com",
        identityNumber: "11111111111",
        registrationAddress: "Istanbul",
        city: "Istanbul",
        country: "Turkey",
        zipCode: "34000",
        ip: req.ip || "127.0.0.1",
      },
      shippingAddress: {
        contactName: req.user.username || "User",
        city: "Istanbul",
        country: "Turkey",
        address: "Istanbul",
        zipCode: "34000",
      },
      billingAddress: {
        contactName: req.user.username || "User",
        city: "Istanbul",
        country: "Turkey",
        address: "Istanbul",
        zipCode: "34000",
      },
      basketItems: [
        {
          id: String(noteId),
          name: noteRow.title,
          category1: "Notes",
          itemType: "VIRTUAL",
          price: paidPrice,
        },
      ],
    };
    const checkoutResult = await new Promise<any>((resolve, reject) => {
      iyzico.checkoutFormInitialize.create(request, (err: any, result: any) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    if (!checkoutResult || checkoutResult.status !== "success") {
      return res.status(502).json({
        message: checkoutResult?.errorMessage || "Failed to initialize payment",
      });
    }

    await createPaymentSession({
      provider: "iyzico",
      conversationId,
      noteId,
      buyerId: req.user.id,
      amount,
      currency: "TRY",
      providerToken: checkoutResult.token ?? null,
    });

    return res.status(200).json({
      message: "Checkout initialized",
      data: {
        conversationId,
        token: checkoutResult.token,
        paymentPageUrl: checkoutResult.paymentPageUrl,
      },
    });
  } catch (err) {
    console.error("POST /payments/checkout failed:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

paymentsRouter.post("/callback", async (req, res) => {
  const buildRedirectUrl = (base: string, params: Record<string, string>) => {
    const url = new URL(base);
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, value),
    );
    return url.toString();
  };

  const toTwoDecimalNumber = (value: unknown): number | null => {
    if (typeof value === "number") {
      if (!Number.isFinite(value)) return null;
      return Number(value.toFixed(2));
    }

    if (typeof value === "string") {
      const parsed = Number(value);
      if (!Number.isFinite(parsed)) return null;
      return Number(parsed.toFixed(2));
    }

    return null;
  };

  const pickBuyerId = (retrieveResult: any): number | null => {
    const direct = retrieveResult?.buyerId;
    const nested = retrieveResult?.buyer?.id;
    const candidate = typeof direct === "string" ? direct : nested;
    if (typeof candidate !== "string" || candidate.trim().length === 0) {
      return null;
    }
    const parsed = Number(candidate);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
  };

  try {
    const redirectCancel = (reason: string, noteId?: number) => {
      const params: Record<string, string> = { reason };
      if (
        typeof noteId === "number" &&
        Number.isInteger(noteId) &&
        noteId > 0
      ) {
        params.noteId = String(noteId);
      }
      return res.redirect(
        302,
        buildRedirectUrl(env.PAYMENT_CANCEL_URL, params),
      );
    };
    const redirectSuccess = (noteId: number) =>
      res.redirect(
        302,
        buildRedirectUrl(env.PAYMENT_SUCCESS_URL, { noteId: String(noteId) }),
      );
    const tokenFromBody =
      typeof req.body?.token === "string" ? req.body.token.trim() : "";
    const tokenFromQuery =
      typeof req.query?.token === "string" ? req.query.token.trim() : "";
    const token = tokenFromBody || tokenFromQuery;

    if (!token) {
      return redirectCancel("missing_token");
    }
    const retrieveRequest = {
      locale: "tr",
      conversationId: "callback",
      token,
    };

    const retrieveResult = await new Promise<any>((resolve, reject) => {
      iyzico.checkoutForm.retrieve(retrieveRequest, (err: any, result: any) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    if (!retrieveResult || retrieveResult.status !== "success") {
      return redirectCancel("verification_failed");
    }

    const rawConversationId =
      typeof retrieveResult.conversationId === "string"
        ? retrieveResult.conversationId
        : "";

    if (!rawConversationId) {
      return redirectCancel("missing_conversation_id");
    }

    const session = await findPaymentSessionByConversationId(rawConversationId);
    if (!session) {
      return redirectCancel("session_not_found");
    }

    const buyerId = Number(session.buyer_id);
    const noteId = Number(session.note_id);

    if (!Number.isInteger(noteId) || !Number.isInteger(buyerId)) {
      return redirectCancel("invalid_ids");
    }

    if (session.status === "completed") {
      return redirectSuccess(noteId);
    }

    if (session.status === "failed") {
      return redirectCancel("session_already_failed", noteId);
    }

    const noteRow = await findNoteRowById(noteId);
    if (!noteRow) {
      await markPaymentSessionFailed(rawConversationId, "Note not found");
      return redirectCancel("note_not_found", noteId);
    }

    const ownerId = Number(noteRow.owner_id);
    if (ownerId === buyerId) {
      await markPaymentSessionFailed(rawConversationId, "Owner can not buy own note");
      return redirectCancel("owner_blocked", noteId);
    }

    const paymentStatus =
      typeof retrieveResult.paymentStatus === "string"
        ? retrieveResult.paymentStatus.toUpperCase()
        : "";
    if (paymentStatus !== "SUCCESS") {
      await markPaymentSessionFailed(
        rawConversationId,
        retrieveResult?.errorMessage || "Payment is not successful",
      );
      return redirectCancel("payment_not_successful", noteId);
    }

    const providerCurrency =
      typeof retrieveResult?.currency === "string"
        ? retrieveResult.currency.trim().toUpperCase()
        : "";
    const sessionCurrency = String(session.currency || "").trim().toUpperCase();
    if (!providerCurrency || providerCurrency !== sessionCurrency) {
      await markPaymentSessionFailed(rawConversationId, "Currency mismatch");
      return redirectCancel("currency_mismatch", noteId);
    }

    const providerPaidPrice = toTwoDecimalNumber(retrieveResult?.paidPrice);
    const sessionAmount = toTwoDecimalNumber(session.amount);
    if (providerPaidPrice === null || sessionAmount === null) {
      await markPaymentSessionFailed(rawConversationId, "Invalid payment amount");
      return redirectCancel("amount_validation_failed", noteId);
    }
    if (providerPaidPrice !== sessionAmount) {
      await markPaymentSessionFailed(rawConversationId, "Amount mismatch");
      return redirectCancel("amount_mismatch", noteId);
    }

    const providerBuyerId = pickBuyerId(retrieveResult);
    if (providerBuyerId !== null && providerBuyerId !== buyerId) {
      await markPaymentSessionFailed(rawConversationId, "Buyer mismatch");
      return redirectCancel("buyer_mismatch", noteId);
    }

    const alreadyPurchased = await hasUserPurchasedNote(noteId, buyerId);
    if (!alreadyPurchased) {
      await createPurchase(noteId, buyerId);
    }
    const markedSuccess = await markPaymentSessionSuccess(
      rawConversationId,
      typeof retrieveResult.paymentId === "string"
        ? retrieveResult.paymentId
        : null,
    );
    if (!markedSuccess) {
      const reloaded = await findPaymentSessionByConversationId(rawConversationId);
      if (reloaded?.status === "completed") {
        return redirectSuccess(noteId);
      }
      return redirectCancel("session_update_failed", noteId);
    }

    return redirectSuccess(noteId);
  } catch (err) {
    console.error("POST /payments/callback failed:", err);
    return res.redirect(
      302,
      buildRedirectUrl(env.PAYMENT_CANCEL_URL, { reason: "callback_error" }),
    );
  }
});

export default paymentsRouter;
