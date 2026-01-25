import styled from "styled-components";

export const Select = styled.select`
  border: 1px solid;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: #fafafa;
`;

export const Container = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  text-align: center;
`;

export const HeaderText = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[800]};

  display: flex;
  align-items: center;
  justify-content: center; /* yatay ortalama */
  gap: 0.25rem;

  text-align: center;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;
