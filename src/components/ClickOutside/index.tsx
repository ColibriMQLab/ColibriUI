import {
  cloneElement,
  useRef,
  isValidElement,
  useCallback,
  type FC,
  type PropsWithChildren,
  type ReactElement,
  type Ref,
} from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

type ClickOutsideProps = {
  onClick: (e: MouseEvent | TouchEvent) => void;
};

/**
 * Merges multiple refs (callback or object) into a single ref callback.
 */
function useMergedRefs<T>(...refs: (Ref<T> | undefined)[]): (node: T | null) => void {
  return useCallback((node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as React.MutableRefObject<T | null>).current = node;
    }
  }, refs);
}

const ClickOutside: FC<PropsWithChildren<ClickOutsideProps>> = ({
  children,
  onClick,
}) => {
  const localRef = useRef<HTMLElement | null>(null);
  useOnClickOutside(localRef, onClick);

  if (!isValidElement(children)) return null;

  const mergedRef = useMergedRefs(
    localRef,
    (children as any).props?.ref
  );

  return cloneElement(
    children as ReactElement<{ ref?: React.Ref<HTMLElement> }>,
    { ref: mergedRef },
  );
};

export default ClickOutside;
