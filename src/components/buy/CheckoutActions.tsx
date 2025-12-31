import type { Note } from "../note/NoteTypes";
import { CheckoutActionsBox } from "./!CheckoutActions.styled";
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
        <span>{cost}</span>
        <span>{note.price}</span>
      </p>
      <hr />

      <button onClick={onProceed}>{initiatePayment}</button>

      <small>{accessInfo}</small>
    </CheckoutActionsBox>
  );
}
