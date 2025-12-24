import styled from "styled-components";

export const ContentWrapper = styled.div`
  max-width: 48rem;
  margin: 1.5rem auto;
  padding: 1rem;
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.gray[600]};

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

export const Description = styled.p`
  margin-top: 2rem;
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.gray[800]};

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

export const EmailInfo = styled.p`
  margin: 1rem;
  padding: 1rem;
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.gray[800]};

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 2rem;
    font-size: 1.5rem;
  }
`;

export const ButtonSection = styled.div`
  margin: 1rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: bold;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

export const LoginButton = styled.button`
  background-color: ${(props) => props.theme.colors.red[500]};
  color: ${(props) => props.theme.colors.gray[800]};
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.red[700]};
  }
`;

export const RegisterButton = styled.button`
  background-color: ${(props) => props.theme.colors.blue[500]};
  color: ${(props) => props.theme.colors.gray[800]};
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.blue[700]};
  }
`;

export const AccountText = styled.p`
  margin: 0;
`;

export const Spacer = styled.br``;
