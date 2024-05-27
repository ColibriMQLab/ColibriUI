import { FC, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Portal: FC<{ node?: HTMLElement | null; children: ReactNode }> = ({
  children,
  node,
}) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMountNode(node || document.body);
  });

  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
};

export default Portal;
