import styled from "styled-components";

export const SectionTitle = styled.h2`
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
`;

export const EmptyState = styled.p`
  padding: 2rem;
  text-align: center;
  color: #6b7280;
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
