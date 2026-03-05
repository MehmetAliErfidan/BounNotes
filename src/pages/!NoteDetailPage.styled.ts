import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(17, 24, 39, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const ModalCard = styled.div`
  width: 100%;
  max-width: 440px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
  padding: 1rem;
`;

export const ModalTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #111827;
  font-size: 1.05rem;
  font-weight: 700;
`;

export const ModalDescription = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
`;

export const ModalActions = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const CancelButton = styled.button`
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #374151;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  cursor: pointer;
`;

export const ConfirmButton = styled.button`
  border: none;
  background: #dc2626;
  color: #ffffff;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const InlineError = styled.p`
  margin: 0.75rem 0 0 0;
  color: #dc2626;
  font-size: 0.85rem;
`;
