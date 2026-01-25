import styled from "styled-components";

export const MenuWrapper = styled.div<{ $top: number; $left: number }>`
  position: fixed;
  top: ${(p) => p.$top}px;
  left: ${(p) => p.$left}px;

  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  min-width: 180px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  z-index: 9999;
`;

export const MenuItem = styled.button<{ $danger?: boolean }>`
  min-height: 40px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.6rem 0.75rem;
  text-align: left;
  background: none;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  color: ${(p) => (p.$danger ? "#dc2626" : "#111827")};

  &:hover {
    background-color: #f3f4f6;
  }
`;
