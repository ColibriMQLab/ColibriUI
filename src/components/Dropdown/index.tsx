import React, {
	useState,
	useEffect,
	useMemo,
	useCallback,
	Children,
	MouseEventHandler,
	type FC,
	type PropsWithChildren,
	type ReactElement,
	HTMLProps,
} from "react";
import classNames from "classnames/bind";
import {
	useFloating,
	autoUpdate,
	offset,
	flip,
	shift,
	useHover,
	useClick,
	useFocus,
	useDismiss,
	useRole,
	useInteractions,
	FloatingPortal,
	type Placement,
} from "@floating-ui/react";

import ClickOutside from "../ClickOutside";
import styles from "./Dropdown.module.scss";
import type { DropdownProps } from "./index.props";

const clx = classNames.bind(styles);

const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({
	children,
	zIndex,
	fontSize,
	disabled,
	onVisibleChange,
	overlay,
	placement = "bottom-center" as Placement,
	strategy = "absolute",
	trigger = ["hover"],
	visible: visibleProp = true,
	preventOverflow = false,
	preventAutoClose = false,
	flip: flipEnabled = true,
	samewidth = false,
}) => {
	const [visible, setVisible] = useState(false);

	const isVisible = visibleProp && visible && !disabled;

	const { refs, floatingStyles, context, update, placement: finalPlacement } =
		useFloating({
			open: isVisible,
			onOpenChange: setVisible,
			placement,
			strategy,
			whileElementsMounted: autoUpdate,
			middleware: [
				offset(6),
				...(flipEnabled ? [flip()] : []),
				...(preventOverflow ? [shift()] : []),
			],
		});

	const hover = useHover(context, { enabled: trigger.includes("hover") });
	const click = useClick(context, { enabled: trigger.includes("click") });
	const focus = useFocus(context, { enabled: trigger.includes("focus") });
	const dismiss = useDismiss(context);
	const role = useRole(context, { role: "menu" });

	const { getReferenceProps, getFloatingProps } = useInteractions([
		hover,
		click,
		focus,
		dismiss,
		role,
	]);

	const isNotComponent = typeof children === "string";

	const reference: ReactElement | null = useMemo(() => {
		if (!children) return null;
		return Children.only(
			isNotComponent ? <button>{children}</button> : children,
		) as ReactElement;
	}, [children, isNotComponent]);

	const onClickOverlay: MouseEventHandler<HTMLDivElement> = useCallback(
		(event) => {
			event.stopPropagation();
			if (!preventAutoClose) {
				setVisible(false);
			}
		},
		[preventAutoClose],
	);

	useEffect(() => {
		if (onVisibleChange) onVisibleChange(visible);
	}, [onVisibleChange, visible]);

	useEffect(() => {
		if (update) update();
	}, [update, visible]);

	return (
		<>
			{reference && (
				<reference.type
					ref={refs.setReference}
					tabIndex={0}
					{...getReferenceProps(reference.props as HTMLProps<Element>)}
				/>
			)}

			{isVisible && (
				<FloatingPortal>
					<ClickOutside onClick={() => setVisible(false)}>
						<div
							ref={refs.setFloating}
							data-testid="popper-container"
							className={clx("popper-container", `placement-${finalPlacement}`)}
							style={{
								...floatingStyles,
								zIndex,
								minWidth: samewidth
									? `${(refs.reference.current as HTMLElement)?.offsetWidth}px`
									: undefined,
								fontSize: `${fontSize}px`,
							}}
							tabIndex={0}
							{...getFloatingProps()}
						>
							{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
							<div
								data-testid="overlay-container"
								className={clx("overlay-container")}
								onClick={onClickOverlay}
							>
								{overlay}
							</div>
						</div>
					</ClickOutside>
				</FloatingPortal>
			)}
		</>
	);
};

export default Dropdown;
