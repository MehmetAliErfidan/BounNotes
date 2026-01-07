import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  LoginButton,
  RegisterLinkWrapper,
  RegisterButton,
} from "./!GuestAction.styled";
import { useLang } from "../../../i18n";
import { NAVBAR_TEXTS } from "../../../i18n/translations/common/navbar/Navbar";

export default function GuestActions() {
  const { lang } = useLang();
  const { login, register } = NAVBAR_TEXTS[lang];
  return (
    <>
      <Link to="/login">
        <LoginButton>{login}</LoginButton>
      </Link>

      <RegisterLinkWrapper>
        <Link to="/register">
          <RegisterButton>{register}</RegisterButton>
        </Link>
      </RegisterLinkWrapper>

      <LanguageSwitcher />
    </>
  );
}
