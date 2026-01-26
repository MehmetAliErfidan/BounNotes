import styled from "styled-components";

export const Select = styled.select`
  border: 1px solid;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: #fafafa;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  text-align: center;
`;

export const CharCount = styled.p`
  font-size: 0.75rem;
  opacity: 0.6;
  align-self: flex-end;
`;

export const SectionHeader = styled.h3`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[800]};

  margin-bottom: 0.5rem;

  svg {
    width: 16px;
    height: 16px;
    opacity: 0.7;
    margin: 0 0.125rem;
  }
`;
