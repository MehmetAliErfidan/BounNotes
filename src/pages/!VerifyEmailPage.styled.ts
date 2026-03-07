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
  max-width: 420px;
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

export const Message = styled.p<{ $type: "loading" | "success" | "error" }>`
  font-size: 0.95rem;
  color: ${({ $type }) =>
    $type === "success"
      ? "#16a34a"
      : $type === "error"
        ? "#ef4444"
        : "#4b5563"};
`;

export const LoginButton = styled.button`
  margin-top: 1rem;
  width: 100%;
  padding: 0.625rem;
  border-radius: 8px;
  border: none;
  background: #3b82f6;
  color: #fff;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;
