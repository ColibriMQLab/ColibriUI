import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import type { FC } from "react";
import type { PortalProps } from "./index.props";

export const Portal: FC<PortalProps> = ({ children, node }) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMountNode(node || document.body);
  }, [node]);

  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
};
