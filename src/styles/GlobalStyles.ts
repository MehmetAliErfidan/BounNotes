import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Prompt', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
`;

// Heading style used across the app
export const Heading = styled.h1`
  font-size: 2.25rem;
  margin-top: 1rem;
  color: ${(props) => props.theme.colors.gray[900]};
  font-weight: bold;
  line-height: 1.375;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 3.75rem;
  }
`;

//Search section wrapper style used across the app
export const SearchSection = styled.div`
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  margin-bottom: 4rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  @media (max-width: 640px) {
    gap: 0.4rem;
    padding: 0.6rem 0.75rem;
  }
`;

// Main style used across the app
export const Main = styled.main`
  min-height: 100vh;
  font-family: "Prompt", sans-serif;
`;
