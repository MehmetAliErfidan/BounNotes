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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
    transform: none;
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
  min-height: 12rem;
  border-radius: 0.5rem;

  border: 1px dashed #d1d5db;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.875rem;
  color: #9ca3af;
`;

export const AssetList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
`;

export const AssetLink = styled.a`
  color: #2563eb;
  font-size: 0.875rem;
  text-decoration: underline;
`;

export const AssetRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const ImageGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
`;

export const ImageCard = styled.div`
  position: relative;
`;

export const ImageDeleteButton = styled.button`
  position: absolute;
  top: 0.375rem;
  right: 0.375rem;
  border: none;
  background-color: rgba(255, 255, 255, 0.9);
  color: #ef4444;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const CommentsSection = styled.section`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.875rem;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CommentsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CommentsTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
`;

export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 14rem;
  overflow-y: auto;
`;

export const CommentItem = styled.article`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const CommentAuthor = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #1f2937;
`;

export const CommentDate = styled.span`
  font-size: 0.7rem;
  color: #6b7280;
`;

export const CommentContent = styled.p`
  font-size: 0.8rem;
  color: #374151;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const CommentDeleteButton = styled.button`
  align-self: flex-end;
  border: none;
  background: transparent;
  color: #ef4444;
  font-size: 0.75rem;
  cursor: pointer;
`;

export const CommentForm = styled.form`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const CommentInput = styled.input`
  flex: 1;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: #ffffff;
  font-size: 0.8rem;
  padding: 0.55rem 0.75rem;
  color: #111827;
`;

export const CommentSubmitButton = styled.button`
  border: none;
  border-radius: 0.5rem;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.55rem 0.75rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CommentErrorText = styled.p`
  color: #dc2626;
  font-size: 0.8rem;
`;

export const CommentEmptyText = styled.p`
  color: #6b7280;
  font-size: 0.8rem;
`;
