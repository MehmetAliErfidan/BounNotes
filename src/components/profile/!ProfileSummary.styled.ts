import styled from "styled-components";

export const Wrapper = styled.section`
  margin-top: 1.5rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  text-align: left;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #111827; /* gray-900 */
`;

export const EditButton = styled.button`
  font-size: 0.875rem;
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const EmptyText = styled.p`
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

export const List = styled.ul`
  margin-top: 0.75rem;
  font-size: 0.875rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li {
    margin-left: 0.5rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
  }

  li:last-child {
    border-bottom: none;
  }

  .label {
    min-width: 140px;
    color: #6b7280;
    font-weight: 500;
  }

  .value {
    color: #111827;
    max-width: 420px;
    word-break: break-word;
  }
`;
