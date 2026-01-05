import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import NoteDetailUI from "../components/note/NoteDetailUI";
import { dummyData } from "../data/dummyData";
import { Main } from "../styles/GlobalStyles";
import {
  CheckoutLayout,
  CheckoutContent,
  ActionWrapper,
  BackMessage,
} from "./!CheckoutPage.styled";
import Navbar from "../components/common/navbar/Navbar";
import CheckoutActions from "../components/buy/CheckoutActions";
import { CHECKOUT_PAGE_TEXTS } from "../i18n/translations/pages/Checkout";
import { useLang } from "../i18n";

export default function CheckoutPage() {
  const { lang } = useLang();
  const { goBack } = CHECKOUT_PAGE_TEXTS[lang];

  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/search");
    }
  };

  const { id } = useParams<{ id: string }>();
  const note = dummyData.find((n) => n.id === Number(id));

  if (!note) {
    return <p>Note not found.</p>;
  }

  return (
    <Main>
      <Navbar />
      <CheckoutLayout>
        <CheckoutContent>
          <NoteDetailUI note={note} mode="checkout" />
        </CheckoutContent>
        <ActionWrapper>
          <CheckoutActions
            note={note}
            onProceed={() => {
              console.log("Payment flow will start");
            }}
          />
          <BackMessage onClick={handleGoBack}>
            <FaArrowLeftLong /> {goBack}
          </BackMessage>
        </ActionWrapper>
      </CheckoutLayout>
    </Main>
  );
}
