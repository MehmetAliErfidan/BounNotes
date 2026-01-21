import styled from "styled-components";

export const TooltipContent = styled.div`
  background-color: #111827;
  color: #ffffff;

  padding: 0.4rem 0.6rem;
  border-radius: 0.375rem;

  font-size: 0.75rem;
  line-height: 1.2;
  font-weight: 500;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
`;

export const TooltipArrow = styled.svg`
  fill: #111827;
`;
