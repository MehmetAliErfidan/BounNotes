import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid ${(p) => p.theme.colors.gray[300]};
`;

export const SwitchModeButton = styled.button<{ $active: boolean }>`
  position: relative;
  padding: 0.5rem 0;
  background: none;
  border: 1px solid transparent;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  color: ${(p) =>
    p.$active ? p.theme.colors.gray[900] : p.theme.colors.gray[300]};

  &:hover {
    color: ${(p) => p.theme.colors.gray[900]};
    background: linear-gradient(
      to right,
      #fafafa 0%,
      #f0f0f0 25%,
      #f0f0f0 75%,
      #fafafa 100%
    );
    /*  background-color: #f0f0f0; */
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: ${(p) => (p.$active ? p.theme.colors.primary : "transparent")};
  }
`;
