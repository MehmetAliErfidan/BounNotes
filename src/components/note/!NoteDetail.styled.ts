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
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

export const DeleteButton = styled.button`
  position: absolute;
  right: 1.5rem;
  background: none;
  margin-left: auto;
  border: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
  }
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
  color: #2563eb;
`;

export const Teacher = styled.p`
  font-size: 0.75rem;
  color: #6b7280; /* gray-500 */
`;

/* Description box */
export const DescriptionBox = styled.div`
  background-color: #f9fafb;
  border-radius: 0.5rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

export const CourseDate = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280; /* gray-500 */
`;

export const CourseYear = styled.span`
  color: #2563eb;
`;
export const CourseTerm = styled.span`
  color: #2563eb;
`;

export const UploadDate = styled.p`
  font-size: 0.6rem;
  color: #9ca3af; /* gray-400 */
  text-align: left;
`;

export const Description = styled.p`
  font-size: 0.875rem;
  color: #374151; /* gray-700 */
  line-height: 1.6;
`;

/* PDF Preview */
export const PdfPreview = styled.div`
  height: 12rem;
  border-radius: 0.5rem;

  border: 1px dashed #d1d5db;

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
  color: #111827;
`;

export const BuyButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;

  background-color: #2563eb;
  color: #ffffff;

  font-size: 0.875rem;
  font-weight: 500;

  border: none;
  cursor: pointer;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }
`;
