import { cloneElement, useRef, isValidElement } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import type React from "react";
import type { FC, PropsWithChildren, ReactElement, RefCallback } from "react";

type ClickOutsideProps = {
  onClick: (e: MouseEvent | TouchEvent) => void;
};

const ClickOutside: FC<PropsWithChildren<ClickOutsideProps>> = ({
  children,
  onClick,
}) => {
  const childRef = useRef<HTMLElement | null>(null);

  useOnClickOutside(childRef, onClick);

  if (!isValidElement(children)) return null;

  const combinedRef: RefCallback<HTMLElement> = (node) => {
    childRef.current = node;

    const childRefProp = (children as any).ref;
    if (typeof childRefProp === "function") {
      childRefProp(node);
    } else if (
      childRefProp &&
      typeof childRefProp === "object" &&
      "current" in childRefProp
    ) {
      (childRefProp as { current: HTMLElement | null }).current = node;
    }
  };

  return cloneElement(
    children as ReactElement<{ ref?: React.Ref<HTMLElement> }>,
    {
      ref: combinedRef,
    },
  );
};

export default ClickOutside;
