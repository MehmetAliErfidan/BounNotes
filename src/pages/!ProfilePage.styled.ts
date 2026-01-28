import styled from "styled-components";

export const MyNotesButton = styled.button`
  margin: 2.5rem auto 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  padding: 0.6rem 2.2rem;
  font-size: 1rem;
  font-weight: 500;

  border-radius: 9999px;

  background-color: #ffffff;
  color: #1f2937;

  border: 1.5px solid #e5e7eb;
  box-shadow: none;

  cursor: pointer;

  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    transform 0.05s ease;

  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
  }

  &:active {
    transform: scale(0.98);
  }
`;
