import styled from "styled-components";

export const UserActionsRow = styled.div`
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
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
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

export const EditButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.4rem 0.75rem;
  border-radius: 9999px;

  background-color: #f9fafb;
  border: 1px solid #e5e7eb;

  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;

  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }

  &:active {
    background-color: #e5e7eb;
  }
`;

export const DownloadButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.4rem 0.75rem;
  border-radius: 9999px;

  background-color: #f9fafb;
  border: 1px solid #e5e7eb;

  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;

  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }

  &:active {
    background-color: #e5e7eb;
  }
`;

export const LikeButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const LikeButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  font-size: 0.875rem;
  color: ${(p) => p.theme.colors.gray[600]};
  cursor: pointer;

  transition:
    color 0.15s ease,
    transform 0.1s ease;

  &:hover {
    color: ${(p) => p.theme.colors.gray[800]};
    transform: translateY(-1px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const CommentButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  color: #9ca3af;
  transition: color 0.2s ease;

  &:hover {
    color: #2563eb;
    transform: translateY(-1px);
  }
`;
