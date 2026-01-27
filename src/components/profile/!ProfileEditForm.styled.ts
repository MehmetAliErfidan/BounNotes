import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Textarea = styled.textarea`
  padding: 0.5rem;
  font-size: 0.875rem;
  min-height: 80px;
  border: 1px solid;
  border-radius: 0.25rem;
  background-color: #fafafa;
  max-height: 16rem;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const ActionButton = styled.button<{
  $variant?: "default" | "danger";
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9999px;
  border: 1px solid #d1d5db;
  background-color: #f3f4f6;

  color: #374151;
  font-weight: 500;

  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;

  @media (min-width: 768px) {
    padding: 0.5rem 0.875rem;
    font-size: 0.875rem;
  }

  @media (min-width: 1024px) {
    padding: 0.5rem 1rem;
  }

  &:hover {
    background-color: #e5e7eb;
  }

  ${({ $variant }) =>
    $variant === "danger" &&
    css`
      border-color: #f87171; /* red-400 */
      color: #dc2626; /* red-600 */

      &:hover {
        background-color: #fef2f2; /* red-50 */
        border-color: #ef4444; /* red-500 */
      }
    `}
`;
