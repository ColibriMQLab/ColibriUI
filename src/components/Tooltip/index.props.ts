import type { ReactNode } from "react";
import { Placement, Strategy } from "@floating-ui/react";
export type TooltipProps = {
	content: ReactNode;
	zIndex?: number;
	placement?: Placement;
	strategy?: Strategy;
	withTail?: boolean;
	className?: string;
}
