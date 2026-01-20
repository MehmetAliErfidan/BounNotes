import * as RadixTooltip from "@radix-ui/react-tooltip";
import { TooltipArrow, TooltipContent } from "./Tooltip.styled";
import type { ReactNode } from "react";

type Props = {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delay?: number;
};

export default function Tooltip({
  content,
  children,
  side = "top",
  delay = 300,
}: Props) {
  return (
    <RadixTooltip.Provider delayDuration={delay}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>

        <RadixTooltip.Portal>
          <RadixTooltip.Content side={side} sideOffset={6} asChild>
            <TooltipContent>
              {content}
              <RadixTooltip.Arrow asChild>
                <TooltipArrow />
              </RadixTooltip.Arrow>
            </TooltipContent>
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
