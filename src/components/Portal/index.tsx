import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import type { FC, PropsWithChildren } from "react";

const Portal: FC<PropsWithChildren<{ node?: HTMLElement | null }>> = ({
	children,
	node,
}) => {
	const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

	useEffect(() => {
		setMountNode(node || document.body);
	}, [node]);

	return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
};

export default Portal;
