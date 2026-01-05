import Logo from "../Logo";
import {
  StyledNav,
  NavContainer,
  LogoWrapper,
  ButtonGroup,
} from "./!Navbar.styled";
import UserActions from "./UserActions";
import GuestActions from "./GuestActions";
import { useAppSelector } from "../../../features/hooks";

export default function Navbar() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <StyledNav>
      <NavContainer>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        <ButtonGroup>{user ? <UserActions /> : <GuestActions />}</ButtonGroup>
      </NavContainer>
    </StyledNav>
  );
}
