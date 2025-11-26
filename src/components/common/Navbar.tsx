import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useLang } from "../../i18n";
import { NAVBAR_TEXTS } from "../../i18n/translations/common/Navbar";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  StyledNav,
  NavContainer,
  LogoWrapper,
  ButtonGroup,
  LoginButton,
  RegisterLinkWrapper,
  RegisterButton,
} from "./!Navbar.styled";

export default function Navbar() {
  const { lang } = useLang();
  const { login, register } = NAVBAR_TEXTS[lang];

  return (
    <StyledNav>
      <NavContainer>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        <ButtonGroup>
          <Link to="/login">
            <LoginButton>{login}</LoginButton>
          </Link>

          <RegisterLinkWrapper>
            <Link to="/register">
              <RegisterButton>{register}</RegisterButton>
            </Link>
          </RegisterLinkWrapper>

          <LanguageSwitcher />
        </ButtonGroup>
      </NavContainer>
    </StyledNav>
  );
}
