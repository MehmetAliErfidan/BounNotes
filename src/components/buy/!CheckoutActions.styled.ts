import styled from "styled-components";

export const CheckoutActionsBox = styled.div`
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

  span {
    font-size: 1.5rem;
  }

  small {
    display: block;
    margin-top: 0.75rem;
  }

  button {
    border-radius: 0.5rem;
    font-weight: 500;
    width: 100%;
    margin-top: 0.5rem;
    padding: 0.75rem 1rem;

    background-color: #fcd34d;
    color: #1f2937;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    cursor: pointer;

    transition: background-color 0.15s ease, transform 0.05s ease,
      box-shadow 0.05s ease;
  }

  button:hover {
    background-color: #fbbf24;
  }

  button:active {
    transform: scale(0.97);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
  }
`;
