import { useNavigate, useSearchParams } from "react-router-dom";
import { useLang } from "../i18n";
import { PAYMENT_RESULT } from "../i18n/translations/pages/PaymentResult";
import * as S from "./!PaymentResultPage.styled";

export default function PaymentCancelPage() {
  const { lang } = useLang();
  const { cancelTitle, cancelMessage, retryPayment, goMarket } =
    PAYMENT_RESULT[lang];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const noteId = searchParams.get("noteId");

  const handleRetry = () => {
    if (noteId) {
      navigate(`/note/${noteId}/buy`);
      return;
    }
    navigate("/search");
  };

  return (
    <S.Container>
      <S.Card>
        <S.Title>{cancelTitle}</S.Title>
        <S.Message $type="error">{cancelMessage}</S.Message>
        <S.Actions>
          <S.PrimaryButton onClick={handleRetry}>{retryPayment}</S.PrimaryButton>
          <S.SecondaryButton onClick={() => navigate("/search")}>
            {goMarket}
          </S.SecondaryButton>
        </S.Actions>
      </S.Card>
    </S.Container>
  );
}
