import styled from "styled-components";

export const Container = styled.div`
  font-family: Prompt;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 1rem;

  @media (min-width: 768px) {
    width: 32rem;
    justify-content: flex-start;
    padding: 0;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
`;

export const Label = styled.p`
  font-weight: 500;
  margin-right: 0.5rem;
`;
