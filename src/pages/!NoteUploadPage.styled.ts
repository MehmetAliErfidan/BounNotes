import styled from "styled-components";

export const PageHeader = styled.div`
  margin-bottom: 1.25rem;
  margin-top: 1.5rem;

  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.875rem;
    color: #6b7280;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  max-width: 420px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.75rem 1rem;

  border-radius: 0.5rem;
  font-weight: 500;

  background-color: #fde68a;
  color: #1f2937;

  box-shadow: 0 -6px 12px rgba(0, 0, 0, 0.04);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  cursor: pointer;

  transition:
    background-color 0.15s ease,
    transform 0.05s ease,
    box-shadow 0.05s ease;

  &:not(:disabled):hover {
    background-color: #fcd34d;
  }

  &:not(:disabled):active {
    transform: scale(0.97);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.5);
  }

  &:disabled {
    background-color: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.25rem;
  }
`;

export const FileUploadContainer = styled.div`
  flex: 0 0 320px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
  }
`;

export const NoteFormWrapper = styled.div`
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 1.25rem; /* mobilde daha ferah */
  }
`;

export const SubmitArea = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
`;
