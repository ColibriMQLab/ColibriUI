import React, {
	useState,
	useMemo,
	cloneElement,
	type FC,
	type PropsWithChildren,
	type ReactElement,
} from "react";
import classNames from "classnames/bind";
import {
	useFloating,
	offset,
	flip,
	shift,
	arrow,
	useHover,
	useDismiss,
	useRole,
	useInteractions,
	FloatingPortal,
	FloatingArrow,
} from "@floating-ui/react";
import styles from "./Tooltip.module.scss";
import type { ITooltipProps } from "./index.props";

const clx = classNames.bind(styles);

const Tooltip: FC<PropsWithChildren<ITooltipProps>> = ({
	children,
	content,
	zIndex = 1000,
	withTail = false,
	placement = "bottom",
	strategy = "absolute",
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [arrowEl, setArrowEl] = useState<SVGSVGElement | null>(null);

	// === Floating UI setup ===
	const {
		refs,
		context,
		floatingStyles,
		middlewareData,
	} = useFloating({
		placement,
		strategy,
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [offset(8), flip(), shift({ padding: 8 }), arrow({ element: arrowEl })],
	});

	// === Interactions ===
	const hover = useHover(context, { move: false, delay: { open: 100, close: 100 } });
	const dismiss = useDismiss(context);
	const role = useRole(context, { role: "tooltip" });
	const { getReferenceProps, getFloatingProps } = useInteractions([hover, dismiss, role]);

	// === Prepare reference element ===
	const reference = useMemo(() => {
		if (!children) return null;
		if (typeof children === "string") {
			return <span>{children}</span>;
		}
		return children as ReactElement;
	}, [children]);

	// === Clone trigger with ref & props ===
	const trigger = reference
		? cloneElement(reference, {
			ref: refs.setReference,
			...getReferenceProps(),
		})
		: null;

	// === Determine arrow side for CSS ===
	const basePlacement = placement.split("-")[0] as "top" | "right" | "bottom" | "left";
	const staticSide: "top" | "right" | "bottom" | "left" =
		{ top: "bottom", right: "left", bottom: "top", left: "right" }[basePlacement] as "top" | "right" | "bottom" | "left";

	// === Arrow position ===
	const arrowX = middlewareData.arrow?.x ?? 0;
	const arrowY = middlewareData.arrow?.y ?? 0;

	return (
		<>
			{trigger}
			{isOpen && (
				<FloatingPortal>
					<div
						ref={refs.setFloating}
						{...getFloatingProps()}
						className={clx("root", { tail: withTail })}
						style={{ ...floatingStyles, zIndex }}
					>
						<div className={clx("overlay")}>{content}</div>

						{withTail && (
							<FloatingArrow
								ref={setArrowEl}
								context={context}
								className={clx("tail")}
								style={{
									left: arrowX != null ? `${arrowX}px` : undefined,
									top: arrowY != null ? `${arrowY}px` : undefined,
									[staticSide]: "-4px",
								}}
							/>
						)}
					</div>
				</FloatingPortal>
			)}
		</>
	);
};

export default Tooltip;
