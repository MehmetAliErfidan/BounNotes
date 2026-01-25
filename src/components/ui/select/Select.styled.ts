import styled from "styled-components";
import * as RadixSelect from "@radix-ui/react-select";

export const Trigger = styled(RadixSelect.Trigger)`
  width: 100%;
  border: 1px solid;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: #fafafa;

  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const Content = styled(RadixSelect.Content)`
  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  background-color: #fafafa;
  overflow: auto;
  z-index: 1000;
`;

export const Item = styled(RadixSelect.Item)`
  width: 100%;
  padding: 0.6rem 0.75rem;
  text-align: left;
  cursor: pointer;
  color: #111827;

  &[data-highlighted] {
    background-color: #f3f4f6;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
`;
