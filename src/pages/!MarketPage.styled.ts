import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 1rem;
  font-family: var(--font-prompt, "Prompt", sans-serif);
`;

export const ResultsWrapper = styled.div`
  margin-top: 1.5rem;
`;

export const SearchInfoText = styled.p`
  font-size: 0.875rem;
  color: #4b5563; /* text-gray-600 */
  margin-bottom: 0.75rem;
`;

export const NoResultText = styled.p`
  color: #6b7280; /* text-gray-500 */
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;
