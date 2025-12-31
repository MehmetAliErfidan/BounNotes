import styled from "styled-components";

/* Wrapper */
export const Wrapper = styled.div`
  max-width: 48rem; /* max-w-3xl */
  margin: 1rem auto;
  width: 100%;

  background-color: #ffffff;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb; /* gray-200 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

/* Header */
export const Header = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827; /* gray-900 */
  text-align: center;
`;

/* Content */
export const Content = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

/* Course & Teacher */
export const Meta = styled.div``;

export const Course = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #2563eb; /* blue-600 */
`;

export const Teacher = styled.p`
  font-size: 0.75rem;
  color: #6b7280; /* gray-500 */
`;

/* Description box */
export const DescriptionBox = styled.div`
  background-color: #f9fafb; /* gray-50 */
  border-radius: 0.5rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DateText = styled.p`
  font-size: 0.75rem;
  color: #9ca3af; /* gray-400 */
  text-align: left;
`;

export const Description = styled.p`
  font-size: 0.875rem;
  color: #374151; /* gray-700 */
  line-height: 1.6;
`;

/* User & Rating */
export const UserRatingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;

  background: linear-gradient(135deg, #60a5fa, #2563eb);

  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;
  font-weight: 600;
`;

export const Username = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937; /* gray-800 */
`;

export const RatingActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Stars = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const CommentButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  color: #9ca3af; /* gray-400 */
  transition: color 0.2s ease;

  &:hover {
    color: #2563eb; /* blue-600 */
  }
`;

/* PDF Preview */
export const PdfPreview = styled.div`
  height: 12rem;
  border-radius: 0.5rem;

  border: 1px dashed #d1d5db; /* gray-300 */

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.875rem;
  color: #9ca3af;
`;

/* Price & Buy */
export const BuyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Price = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827; /* gray-900 */
`;

export const BuyButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;

  background-color: #2563eb; /* blue-600 */
  color: #ffffff;

  font-size: 0.875rem;
  font-weight: 500;

  border: none;
  cursor: pointer;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8; /* blue-700 */
  }
`;
