// Navbar.styles.ts
import styled from "styled-components";

export const StyledNav = styled.nav`
  overflow-x: hidden;
`;

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(to right, #93c5fd, #d8b4fe, #f472b6);
  width: 100%;
  gap: 1rem;
  min-width: 100%;

  @media (min-width: 640px) {
    flex-direction: row;
    padding: 1rem 1.5rem;
    gap: 0;
  }

  @media (min-width: 1024px) {
    padding: 1rem 4rem;
  }
`;

export const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  @media (min-width: 640px) {
    width: auto;
    justify-content: flex-start;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;

  @media (min-width: 640px) {
    gap: 1rem;
    width: auto;
  }
`;
