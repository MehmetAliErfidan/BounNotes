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
  position: absolute;

  top: 58%;
  left: 50%;
  transform: translate(-50%, -50%);

  max-height: clamp(200px, 40vh, 420px);
  width: auto;

  opacity: 0.65;

  @media (max-width: 768px) {
    position: static;
    transform: none;
    margin-top: 2rem;
    max-height: 160px;
  }
`;
