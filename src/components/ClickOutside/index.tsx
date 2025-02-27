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

    if (React.isValidElement(children) && "ref" in children.props) {
      const childRefProp = children.props.ref;

      if (typeof childRefProp === "function") {
        childRefProp(node);
      } else if (childRefProp && typeof childRefProp === "object") {
        (childRefProp as React.MutableRefObject<HTMLElement | null>).current =
          node;
      }
    }
  };

  return cloneElement(children as ReactElement, {
    ref: combinedRef,
  });
};

export default ClickOutside;
