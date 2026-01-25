import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Select = styled.select`
  border: 1px solid;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: #fafafa;
`;

export const SelectOption = styled.option`
  width: 100%;
  padding: 0.6rem 0.75rem;
  text-align: left;
  background: none;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  color: #111827;

  &:hover {
    background-color: #f3f4f6;
  }
`;
