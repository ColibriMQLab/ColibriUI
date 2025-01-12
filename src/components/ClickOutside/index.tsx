import React, { cloneElement, useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import type { FC, PropsWithChildren, ReactElement } from "react";

const ClickOutside: FC<
  PropsWithChildren<{
    onClick: (e: MouseEvent | TouchEvent) => void;
  }>
> = ({ children, onClick }) => {
  const childRef = useRef<HTMLElement>();

  useOnClickOutside(childRef, onClick);

  if (!React.isValidElement(children)) return null;

  const combinedRef = (node: HTMLElement) => {
    childRef.current = node;

    // @ts-expect-error expected
    const { ref } = children;

    if (ref) {
      if (typeof ref === "function") {
        ref(node);
      } else if (typeof ref === "object" && ref !== null) {
        (ref as React.MutableRefObject<HTMLElement>).current = node;
      }
    }
  };

  return cloneElement(children as ReactElement, {
    ref: combinedRef,
  });
};

export default ClickOutside;
