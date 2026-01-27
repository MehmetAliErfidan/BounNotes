import styled from "styled-components";

export const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

export const TitleWrapper = styled.div`
  margin-bottom: 0.75rem;
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  line-height: 1.375;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const MetaWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const Course = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #2563eb;
`;

export const Teacher = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
`;

export const Bottom = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.875rem;
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

export const Avatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;

  background: linear-gradient(135deg, #60a5fa, #2563eb);

  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const Username = styled.p`
  color: #374151;
  font-weight: 500;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RatingPriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Rating = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: #ca8a04;
`;

export const Price = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
`;

export const CTAButton = styled.button`
  margin-top: 0.25rem;
  width: 100%;

  padding: 0.5rem 0;
  border-radius: 0.5rem;

  background-color: #2563eb;
  color: #ffffff;

  font-size: 0.875rem;
  font-weight: 500;

  border: none;
  cursor: pointer;

  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
`;
