import React, {
	useState,
	useEffect,
	useCallback,
	useMemo,
	Children,
} from "react";
import classNames from "classnames/bind";
import { usePopper } from "react-popper";
import Portal from "../Portal";

import { on } from "../helpers/on";
import ClickOutside from "../ClickOutside";

import styles from "./Dropdown.module.scss";
import type { DropdownProps } from "./index.props";
import type {
	FC,
	MouseEventHandler,
	PropsWithChildren,
	ReactElement,
} from "react";

const clx = classNames.bind(styles);

const Dropdown: FC<PropsWithChildren<DropdownProps>> = ({
	children,
	zIndex,
	fontSize,
	disabled,
	onVisibleChange,
	overlay,
	placement = "bottom-start",
	strategy = "absolute",
	trigger = ["hover"],
	visible: visibleProp = true,
	preventOverflow = false,
	preventAutoClose = false,
	flip = true,
	samewidth = false,
}) => {
	const [controlElement, setControlElement] = useState<HTMLElement | null>(
		null,
	);
	const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
		null,
	);

	const [visible, setVisible] = useState(false);

	const isVisible = visibleProp && visible && !disabled;

	const {
		styles: popperStyles,
		attributes,
		update,
	} = usePopper(controlElement, popperElement, {
		placement,
		strategy,
		modifiers: [
			{
				name: "flip",
				enabled: flip,
				options: {
					fallbackPlacements: ["top"],
				},
			},
			{
				name: "preventOverflow",
				enabled: preventOverflow,
			},
		],
	});

	const isNotComponent = typeof children === "string";

	const reference: ReactElement | null = useMemo(() => {
		if (!children) return null;

		return Children.only(
			isNotComponent ? <button>{children}</button> : children,
		) as ReactElement;
	}, [children, isNotComponent]);

	const onToggle = (event: MouseEvent | TouchEvent) => {
		if ((event.target as HTMLElement)?.closest('[data-ignore-click="true"]')) {
			return;
		}

		setVisible((state) => !state);
	};

	const handleShow = () => setVisible(true);

	const handleHide = useCallback(() => {
		setVisible(false);
	}, []);

	const onClickOutside = useCallback(
		(event: MouseEvent | TouchEvent) => {
			if (controlElement?.contains(event.target as Node)) return;
			handleHide();
		},
		[handleHide, controlElement],
	);

	const onClickOverlay: MouseEventHandler<HTMLDivElement> = useCallback(
		(event) => {
			event.stopPropagation();
			if (!preventAutoClose) {
				handleHide();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[handleHide],
	);

	useEffect(() => {
		const unsubscribes: ReturnType<typeof on>[] = [];

		if (trigger.includes("click")) {
			unsubscribes.push(on(controlElement, "click", onToggle, false));
		}

		if (trigger.includes("hover")) {
			unsubscribes.push(on(controlElement, "mouseenter", handleShow, false));
			unsubscribes.push(on(controlElement, "mouseleave", handleHide, false));
			unsubscribes.push(on(popperElement, "mouseenter", handleShow, false));
			unsubscribes.push(on(popperElement, "mouseleave", handleHide, false));
		}

		if (trigger.includes("focus")) {
			const onFocusOut = () => {
				requestAnimationFrame(() => {
					if (controlElement?.contains(document.activeElement)) return;
					if (popperElement?.contains(document.activeElement)) return;

					handleHide();
				});
			};
			unsubscribes.push(on(controlElement, "focusin", handleShow, false));
			unsubscribes.push(on(controlElement, "focusout", onFocusOut, false));
			unsubscribes.push(on(popperElement, "focusin", handleShow, false));
			unsubscribes.push(on(popperElement, "focusout", onFocusOut, false));
		}

		return () => unsubscribes.forEach((un) => un());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [controlElement, popperElement, onToggle, handleShow, handleHide]);

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
					ref={setControlElement}
					tabIndex={0}
					{...reference.props}
				/>
			)}
			{isVisible && (
				<Portal>
					<ClickOutside onClick={onClickOutside}>
						<div
							ref={setPopperElement}
							data-testid="popper-container"
							className={clx("popper-container")}
							style={{
								...popperStyles.popper,
								zIndex,
								minWidth: controlElement?.offsetWidth,
								...(samewidth && {
									maxWidth: controlElement?.offsetWidth,
								}),
								fontSize: `${fontSize}px`,
							}}
							tabIndex={0}
							{...attributes.popper}
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
				</Portal>
			)}
		</>
	);
};

export default Dropdown;
