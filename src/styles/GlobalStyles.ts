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

{
  /* --- Form and Input styles used across the app ---*/
}
export const Form = styled.form<{
  variant?: "card" | "plain";
  size?: "normal" | "wide";
}>`
  overflow-y: auto;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 0 12px 2px rgba(96, 165, 250, 0.4);
  border-radius: 0.5rem;
  background-color: #bfdbfe;

  ${({ size = "normal" }) =>
    size === "normal"
      ? `
        max-width: 28rem;
        padding: 1.5rem;
        gap: 0.75rem;
      `
      : `
        max-width: 42rem;
        padding: 3rem 3rem;
        gap: 1.75rem;
      `}

  ${({ variant = "card" }) =>
    variant === "card"
      ? `
        box-shadow: 0 0 12px 2px rgba(96, 165, 250, 0.4);
      `
      : `
        box-shadow: none;
        border: 1px solid rgba(0,0,0,0.06);
      `}

  @media (min-width: 768px) {
    max-width: 28rem;
  }

  @media (min-width: 1024px) {
    max-width: 32rem;
  }
`;

// Input style used across the app
export const Input = styled.input`
  border: 1px solid;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: #fafafa;
`;

// Textarea style used across the app
export const Textarea = styled.textarea`
  width: 100%;
  min-height: 6rem;
  max-height: 16rem;
  font-family: inherit;
  line-height: 1.5;
  resize: vertical;
  color: #111;
  border: 1px solid;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: #fafafa;

  &:focus {
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.25);
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  text-align: center;
`;

export const HeaderText = styled.p`
  color: #4b5563;
  font-size: 1rem;
  font-weight: 600;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;
