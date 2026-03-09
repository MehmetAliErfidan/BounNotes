import { useNavigate } from "react-router-dom";
import { useLang } from "../i18n";
import { PAYMENT_RESULT } from "../i18n/translations/pages/PaymentResult";
import * as S from "./!PaymentResultPage.styled";

export default function PaymentSuccessPage() {
  const { lang } = useLang();
  const { successTitle, successMessage, goMyNotes, goMarket } =
    PAYMENT_RESULT[lang];
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Card>
        <S.Title>{successTitle}</S.Title>
        <S.Message $type="success">{successMessage}</S.Message>
        <S.Actions>
          <S.PrimaryButton onClick={() => navigate("/my-notes")}>
            {goMyNotes}
          </S.PrimaryButton>
          <S.SecondaryButton onClick={() => navigate("/search")}>
            {goMarket}
          </S.SecondaryButton>
        </S.Actions>
      </S.Card>
    </S.Container>
  );
}
