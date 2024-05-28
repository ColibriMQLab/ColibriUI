import React, { useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import type { FC, ReactNode } from "react";

const ClickOutside: FC<{
  onClick: (e: MouseEvent | TouchEvent) => void;
  children: ReactNode;
}> = ({ children, onClick }) => {
  const childRef = useRef<HTMLElement>();

  useOnClickOutside(childRef, onClick);

  if (!React.isValidElement(children)) return null;

  return React.cloneElement(children, {
    // @ts-expect-error expected
    ref: (node: HTMLElement) => {
      childRef.current = node;

      // @ts-expect-error expected
      const { ref } = children;

      // @ts-expect-error expected
      if (typeof children.ref === "function") {
        ref(node);
      }
    },
  });
};

export default ClickOutside;
