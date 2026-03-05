import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import NoteDetailUI from "../components/note/NoteDetailUI";
import { Main } from "../styles/GlobalStyles";
import { buildOptionalAuthHeaders } from "../features/auth/authRequest";
import type { Note, NoteWithContext } from "../config/note.types";
import type { NotePermissions } from "../components/note/NotePermissions";
import {
  CheckoutLayout,
  CheckoutContent,
  ActionWrapper,
  BackMessage,
  PurchaseErrorText,
} from "./!CheckoutPage.styled";
import Navbar from "../components/common/navbar/Navbar";
import CheckoutActions from "../components/buy/CheckoutActions";
import { CHECKOUT_PAGE_TEXTS } from "../i18n/translations/pages/Checkout";
import { useLang } from "../i18n";
import { notePermissionsFromContext } from "../components/note/notePermissionsFromContext";
import { API_BASE_URL } from "../config/api";

export default function CheckoutPage() {
  const { lang } = useLang();
  const { goBack, noteNotFound, loadingText, purchaseFailed } =
    CHECKOUT_PAGE_TEXTS[lang];
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [note, setNote] = useState<Note | null>(null);
  const [context, setContext] = useState<NoteWithContext["context"] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadNote = async () => {
      if (!id) {
        if (!isMounted) return;
        setHasError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setHasError(false);
        const response = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
          headers: buildOptionalAuthHeaders(),
        });
        if (!response.ok) {
          if (!isMounted) return;
          setHasError(true);
          return;
        }

        const data = (await response.json()) as NoteWithContext;
        if (!isMounted) return;

        setNote(data.note);
        setContext(data.context);
      } catch {
        if (!isMounted) return;
        setHasError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadNote();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleGoBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/search");
  };

  const handlePurchase = async () => {
    if (isPurchasing) return;

    try {
      if (!id) return;
      setIsPurchasing(true);
      setPurchaseError("");
      const res = await fetch(`${API_BASE_URL}/api/notes/${id}/purchase`, {
        method: "POST",
        headers: buildOptionalAuthHeaders(),
      });
      if (!res.ok) {
        const errorData = (await res.json().catch(() => null)) as {
          message?: string;
          error?: string;
        } | null;
        setPurchaseError(
          errorData?.message || errorData?.error || purchaseFailed,
        );
        return;
      }
      navigate("/my-notes");
    } catch {
      setPurchaseError(purchaseFailed);
    } finally {
      setIsPurchasing(false);
    }
  };

  const basePermissions: NotePermissions = context
    ? notePermissionsFromContext(context)
    : {
        canBuy: false,
        canEdit: false,
        canDownload: false,
        canRate: false,
        canComment: false,
        showUserInfo: false,
      };

  const checkoutPermissions = { ...basePermissions, canBuy: false };

  useEffect(() => {
    if (!loading && note && context && !basePermissions.canBuy) {
      navigate(`/note/${note.id}`, { replace: true });
    }
  }, [loading, note, context, basePermissions.canBuy, navigate]);

  if (loading) return <p>{loadingText}</p>;
  if (hasError || !note || !context) return <p>{noteNotFound}</p>;
  if (!basePermissions.canBuy) return null;
  return (
    <Main>
      <Navbar />
      <CheckoutLayout>
        <CheckoutContent>
          <NoteDetailUI note={note} permissions={checkoutPermissions} />
        </CheckoutContent>
        <ActionWrapper>
          <CheckoutActions
            note={note}
            onProceed={handlePurchase}
            isSubmitting={isPurchasing}
          />
          {purchaseError ? (
            <PurchaseErrorText>{purchaseError}</PurchaseErrorText>
          ) : null}
          <BackMessage onClick={handleGoBack}>
            <FaArrowLeftLong /> {goBack}
          </BackMessage>
        </ActionWrapper>
      </CheckoutLayout>
    </Main>
  );
}
