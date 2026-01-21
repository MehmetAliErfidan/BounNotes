import styled from "styled-components";

export const NotesTabBarContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const NoNotesWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 70vh;

  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NoNotesText = styled.div`
  text-align: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.gray[600]};
  max-width: 420px;
  line-height: 1.6;

  margin-top: clamp(0.5rem, 1.5vh, 1rem);
  margin-bottom: clamp(1rem, 3vh, 2rem);
`;

export const EmptyIllustration = styled.img`
  max-height: clamp(200px, 40vh, 420px);
  width: auto;
  opacity: 0.6;
  pointer-events: none;

  margin-top: 1.5rem;
`;

export const UploadNoteCTAButton = styled.button`
  border-radius: 0.5rem;
  font-size: 2rem;
  font-weight: 500;
  width: 30%;
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  outline: none;

  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  justify-content: center;

  background-color: #fcd34d;
  color: #1f2937;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  cursor: pointer;

  transition:
    background-color 0.15s ease,
    transform 0.05s ease,
    box-shadow 0.05s ease;

  &:hover {
    background-color: #fbbf24;
  }

  &:active {
    transform: scale(0.97);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
  }

  svg {
    flex-shrink: 0;
  }
`;
