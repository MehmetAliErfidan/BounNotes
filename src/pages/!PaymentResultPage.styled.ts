import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(to bottom, #f472b6, #93c5fd);
`;

export const Card = styled.div`
  width: 100%;
  max-width: 440px;
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
`;

export const Message = styled.p<{ $type: "success" | "error" }>`
  font-size: 0.95rem;
  color: ${({ $type }) => ($type === "success" ? "#16a34a" : "#ef4444")};
`;

export const Actions = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
`;

export const PrimaryButton = styled.button`
  flex: 1;
  padding: 0.625rem;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

export const SecondaryButton = styled.button`
  flex: 1;
  padding: 0.625rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #374151;
  font-weight: 600;
  cursor: pointer;
`;
