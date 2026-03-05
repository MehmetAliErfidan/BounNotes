import styled from "styled-components";

export {
  PageHeader,
  SubmitButton,
  FlexContainer,
  FileUploadContainer,
  NoteFormWrapper,
  PageContainer,
  ContentContainer,
  SubmitArea,
} from "./!NoteUploadPage.styled";

export const AssetSection = styled.div`
  overflow-y: auto;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: #bfdbfe;
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

export const AssetSectionContainer = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
`;

export const AssetSectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[800]};
  svg {
    width: 16px;
    height: 16px;
    opacity: 0.7;
    flex-shrink: 0;
  }
`;

export const AssetHint = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray[600]};
`;

export const ExistingImageCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  width: 72px;
  flex: 0 0 72px;
`;

export const ExistingImagesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  min-height: 84px;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[800]};
  width: 100%;
  justify-content: center;
  align-items: center;
  opacity: 1;
`;

export const ExistingImagePreview = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  display: block;
`;

export const AssetActionButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.red[500]};
  border-radius: 0.375rem;
  padding: 0;
  font-size: 0.75rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

export const InlineError = styled.p`
  margin: 0.5rem 0 0 0;
  color: #dc2626;
  font-size: 0.875rem;
`;

export const StickySubmitBar = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 20;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  padding: 0.75rem 0.5rem 0.25rem;
  margin-top: 0.75rem;

  backdrop-filter: blur(0.55px);
`;

export const SuccessText = styled.p`
  margin: 0 0 0.4rem 0;
  color: #15803d;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-align: center;
`;
