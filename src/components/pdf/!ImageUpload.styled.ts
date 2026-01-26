import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
`;

export const Card = styled.div`
  overflow-y: auto;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 42rem;
  padding: 3rem;
  gap: 1.75rem;

  border-radius: 0.5rem;
  background-color: #bfdbfe;
  box-shadow: none;
  border: 1px solid rgba(0, 0, 0, 0.06);

  @media (min-width: 768px) {
    max-width: 28rem;
  }

  @media (min-width: 1024px) {
    max-width: 32rem;
  }
`;

export const SectionHeader = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[800]};

  margin-bottom: 0.5rem;

  svg {
    width: 16px;
    height: 16px;
    opacity: 0.7;
    flex-shrink: 0;
  }
`;

export const FileInput = styled.input`
  font-size: 0.9rem;
  padding: 0.9rem 1rem;
  border-radius: 0.5rem;

  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  color: ${({ theme }) => theme.colors.gray[600]};
  cursor: pointer;

  background: linear-gradient(to right, #f472b6, #d8b4fe, #93c5fd);

  transition:
    background 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: linear-gradient(to right, #ec4899, #c4a5fd, #7bb3fc);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::file-selector-button {
    margin-right: 0.75rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    border: none;

    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);

    color: white;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
  }

  transition: transform 0.15s ease;

  &::file-selector-button {
    transition: transform 0.15s ease;
  }

  &::file-selector-button:hover {
    transform: translateY(-1px);
  }

  &::file-selector-button:active {
    transform: scale(0.9);
  }
`;

export const ImagesRow = styled.div<{ $full?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  padding: ${({ $full }) => ($full ? "0.75rem" : "0.5rem")};
  min-height: ${({ $full }) => ($full ? "96px" : "48px")};

  border-radius: 0.5rem;
  border: ${({ theme, $full }) =>
    $full
      ? `1px solid ${theme.colors.gray[800]}`
      : `1px dashed ${theme.colors.gray[800]}`};

  justify-content: ${({ $full }) => ($full ? "space-between" : "flex-start")};
  align-items: center;

  transition:
    border 0.2s ease,
    min-height 0.2s ease,
    padding 0.2s ease;

  cursor: default;
  opacity: ${({ $full }) => ($full ? 1 : 0.65)};
`;

export const ImageCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

export const PreviewImage = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.red[500]};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.red[500]};
`;
