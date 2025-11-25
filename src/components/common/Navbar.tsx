import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useNavbarTexts } from "../../i18n/translations/common-files";
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
  const { login, register } = useNavbarTexts();

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
