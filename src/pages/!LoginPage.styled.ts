import styled from "styled-components";

export const Container = styled.div`
  background: linear-gradient(to bottom, #db2777, #2563eb);
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const Label = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
`;

export const SubmitButton = styled.button<{
  $hasError: boolean;
  $hasEmail: boolean;
  $hasPassword: boolean;
}>`
  background-color: #ef4444;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  color: white;
  font-weight: 600;
  margin-top: 0.75rem;
  transition: all 0.15s;
  cursor: ${(props) =>
    props.$hasError || !props.$hasEmail || !props.$hasPassword
      ? "not-allowed"
      : "pointer"};

  &:hover {
    background-color: #b91c1c;
  }
`;

export const FooterText = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const RegisterLinkSpan = styled.span`
  text-decoration: underline;
  color: #3b82f6;
  cursor: pointer;

  &:hover {
    color: #1d4ed8;
  }
`;
