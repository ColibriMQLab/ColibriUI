import React, { FC, ReactNode, useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

const ClickOutside: FC<{
  onClick: (e: MouseEvent | TouchEvent) => void;
  children: ReactNode;
}> = ({ children, onClick }) => {
  const childRef = useRef<HTMLElement>();

  useOnClickOutside(childRef, onClick);

  if (!React.isValidElement(children)) return null;

  return React.cloneElement(children, {
    // @ts-ignore
    ref: (node: HTMLElement) => {
      childRef.current = node;

      // @ts-ignore
      const { ref } = children;

      // @ts-ignore
      if (typeof children.ref === "function") {
        ref(node);
      }
    },
  });
};

export default ClickOutside;
