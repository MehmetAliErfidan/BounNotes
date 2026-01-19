import styled from "styled-components";

export const LoginButton = styled.button`
  width: 100%;
  padding: 0.5rem 0.75rem;
  background-color: white;
  color: #2563eb;
  border-radius: 0.5rem;
  font-weight: 500;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  font-size: 0.875rem;
  transition:
    background-color 200ms,
    color 200ms;
  cursor: pointer;

  &:hover {
    background-color: #eff6ff;
  }

  @media (min-width: 640px) {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
`;

export const RegisterLinkWrapper = styled.div`
  flex: 1;
  cursor: pointer;

  @media (min-width: 640px) {
    flex: none;
  }
`;

export const RegisterButton = styled.button`
  width: 100%;
  padding: 0.5rem 0.75rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 200ms;

  &:hover {
    background-color: #1d4ed8;
  }

  @media (min-width: 640px) {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
`;
