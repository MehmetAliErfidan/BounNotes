import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLang } from "../i18n";
import { VERIFY_EMAIL } from "../i18n/translations/pages/VerifyEmail";
import { API_BASE_URL } from "../config/api.ts";
import * as S from "./!VerifyEmailPage.styled";

type Status = "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const { lang } = useLang();
  const {
    title,
    verifying,
    success,
    invalidToken,
    invalidOrExpiredToken,
    failed,
    alreadyVerified,
    goLogin,
  } = VERIFY_EMAIL[lang];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState(verifying);

  useEffect(() => {
    const token = searchParams.get("token")?.trim();

    if (!token) {
      setStatus("error");
      setMessage(invalidToken);
      return;
    }

    const run = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}`,
        );
        const data = (await res.json().catch(() => null)) as
          | { message?: string }
          | null;

        if (!res.ok) {
          const rawMessage = data?.message || "";
          setStatus("error");
          if (rawMessage === "Invalid or expired token") {
            setMessage(invalidOrExpiredToken);
            return;
          }
          setMessage(rawMessage || failed);
          return;
        }
        if (data?.message === "Email already verified") {
          setStatus("success");
          setMessage(alreadyVerified);
          return;
        }
        setStatus("success");
        setMessage(data?.message || success);
      } catch {
        setStatus("error");
        setMessage(failed);
      }
    };

    run();
  }, [
    searchParams,
    failed,
    invalidToken,
    invalidOrExpiredToken,
    success,
    verifying,
  ]);

  return (
    <S.Container>
      <S.Card>
        <S.Title>{title}</S.Title>
        <S.Message $type={status}>{message}</S.Message>
        {status !== "loading" && (
          <S.LoginButton onClick={() => navigate("/login")}>
            {goLogin}
          </S.LoginButton>
        )}
      </S.Card>
    </S.Container>
  );
}
