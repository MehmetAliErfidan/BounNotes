import type { Note } from "../note/NoteTypes";
import { MdLockOutline } from "react-icons/md";
import {
  CheckoutActionsBox,
  SecurityInfo,
  TotalLabel,
} from "./!CheckoutActions.styled";
import { CHECKOUT_ACTIONS_TEXTS } from "../../i18n/translations/buy/CheckoutActions";
import { useLang } from "../../i18n";

type Props = {
  note: Note;
  onProceed: () => void;
};

export default function CheckoutActions({ note, onProceed }: Props) {
  const { lang } = useLang();
  const { checkoutSummary, digitalProduct, cost, initiatePayment, accessInfo } =
    CHECKOUT_ACTIONS_TEXTS[lang];

  return (
    <CheckoutActionsBox>
      <h3>{checkoutSummary}</h3>

      <p>
        <strong>{note.title}</strong>
      </p>
      <p className="text-neutral-400">({digitalProduct})</p>

      <hr />

      <p>
        <TotalLabel className="total-label">{cost}</TotalLabel>
        <TotalLabel className="total-label">{note.price}</TotalLabel>
      </p>
      <hr />

      <button onClick={onProceed}>{initiatePayment}</button>
      <SecurityInfo>
        <MdLockOutline />
        <span>{accessInfo}</span>
      </SecurityInfo>
    </CheckoutActionsBox>
  );
}
