import styled from "styled-components";

export const CheckoutLayout = styled.div`
  max-width: 64rem;
  margin: 1rem auto;
  padding: 1rem;
  display: flex;
  gap: 2rem;
  align-items: flex-start;
`;

export const CheckoutContent = styled.div`
  flex: 1;
  & > * {
    margin-top: 0;
    padding-top: 0;
  }
`;

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

export const BackMessage = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 0.875rem;
  color: ${(p) => p.theme.colors.gray[600]};
  cursor: pointer;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.colors.blue[500]};
  }
`;

export const CheckoutActions = styled.div`
  width: 20rem;
  border: 1px solid ${(p) => p.theme.colors.gray[300]};
  border-radius: 0.5rem;
  padding: 1rem;
  position: sticky;
  top: 1rem;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  hr {
    border: none;
    border-top: 1px solid ${(p) => p.theme.colors.gray[300]};
    margin: 1rem 0;
  }
`;
