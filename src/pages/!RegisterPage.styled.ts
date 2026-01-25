import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #f472b6, #93c5fd);
  padding: 1rem;
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

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
`;

export const VerifySection = styled.div`
  text-align: center;
`;

export const SendCodeButton = styled.button<{ $isCodeSent: boolean }>`
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-weight: 600;
  transition: all 0.15s;
  background-color: ${(props) => (props.$isCodeSent ? "#9ca3af" : "#fcd34d")};
  cursor: ${(props) => (props.$isCodeSent ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.$isCodeSent ? "#9ca3af" : "#fbbf24")};
  }
`;

export const VerifyText = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const ButtonSection = styled.div`
  text-align: center;
`;

export const RegisterButton = styled.button<{ $isDisabled: boolean }>`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  color: white;
  font-weight: 600;
  margin-top: 0.75rem;
  transition: all 0.15s;
  background-color: ${(props) => (props.$isDisabled ? "#9ca3af" : "#3b82f6")};
  cursor: ${(props) => (props.$isDisabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.$isDisabled ? "#9ca3af" : "#1d4ed8")};
  }
`;

export const FooterText = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const LoginLinkSpan = styled.span`
  text-decoration: underline;
  color: #ef4444;
  cursor: pointer;

  &:hover {
    color: #b91c1c;
  }
`;
