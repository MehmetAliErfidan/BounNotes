import pool from "../../db/pool";

export type PaymentSessionStatus = "pending" | "completed" | "failed";

export type PaymentSessionRow = {
  id: number;
  provider: string;
  conversation_id: string;
  note_id: number;
  buyer_id: number;
  amount: string;
  currency: string;
  status: PaymentSessionStatus;
  provider_token: string | null;
  payment_id: string | null;
  error_message: string | null;
  created_at: Date | string;
  updated_at: Date | string;
};

export type CreatePaymentSessionInput = {
  provider: string;
  conversationId: string;
  noteId: number;
  buyerId: number;
  amount: number;
  currency: string;
  providerToken?: string | null;
};

export async function createPaymentSession(
  input: CreatePaymentSessionInput,
): Promise<PaymentSessionRow> {
  const { rows } = await pool.query<PaymentSessionRow>(
    `
      INSERT INTO payment_sessions (
        provider,
        conversation_id,
        note_id,
        buyer_id,
        amount,
        currency,
        status,
        provider_token
      )
      VALUES ($1, $2, $3, $4, $5, $6, 'pending', $7)
      RETURNING
        id,
        provider,
        conversation_id,
        note_id,
        buyer_id,
        amount,
        currency,
        status,
        provider_token,
        payment_id,
        error_message,
        created_at,
        updated_at
    `,
    [
      input.provider,
      input.conversationId,
      input.noteId,
      input.buyerId,
      input.amount,
      input.currency,
      input.providerToken ?? null,
    ],
  );

  const created = rows[0];
  if (!created) {
    throw new Error("Failed to create payment session");
  }
  return created;
}

export async function findPaymentSessionByConversationId(
  conversationId: string,
): Promise<PaymentSessionRow | null> {
  const { rows } = await pool.query<PaymentSessionRow>(
    `
      SELECT
        id,
        provider,
        conversation_id,
        note_id,
        buyer_id,
        amount,
        currency,
        status,
        provider_token,
        payment_id,
        error_message,
        created_at,
        updated_at
      FROM payment_sessions
      WHERE conversation_id = $1
      LIMIT 1
    `,
    [conversationId],
  );

  return rows[0] ?? null;
}

export async function markPaymentSessionSuccess(
  conversationId: string,
  paymentId?: string | null,
): Promise<boolean> {
  const { rows } = await pool.query<{ id: number }>(
    `
      UPDATE payment_sessions
      SET
        status = 'completed',
        payment_id = COALESCE($2, payment_id),
        error_message = NULL
      WHERE conversation_id = $1
        AND status = 'pending'
      RETURNING id
    `,
    [conversationId, paymentId ?? null],
  );

  return Boolean(rows[0]);
}

export async function markPaymentSessionFailed(
  conversationId: string,
  errorMessage?: string | null,
): Promise<boolean> {
  const { rows } = await pool.query<{ id: number }>(
    `
      UPDATE payment_sessions
      SET
        status = 'failed',
        error_message = COALESCE($2, error_message)
      WHERE conversation_id = $1
        AND status = 'pending'
      RETURNING id
    `,
    [conversationId, errorMessage ?? null],
  );

  return Boolean(rows[0]);
}
