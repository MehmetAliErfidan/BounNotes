import styled from "styled-components";

export const Wrapper = styled.section`
  margin-top: 1.5rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
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
  line-height: 1.6;
`;
