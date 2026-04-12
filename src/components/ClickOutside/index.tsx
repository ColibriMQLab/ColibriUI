import {
  cloneElement,
  useRef,
  isValidElement,
  useCallback,
  type FC,
  type PropsWithChildren,
  type ReactElement,
  type Ref,
  type MutableRefObject,
} from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

type ClickOutsideProps = {
  onClick: (event: MouseEvent | TouchEvent) => void;
};

/**
 * Merges multiple refs (callback or object) into a single ref callback.
 */
function useMergedRefs<T>(
  ...refs: (Ref<T> | undefined)[]
): (node: T | null) => void {
  return useCallback((node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as MutableRefObject<T | null>).current = node;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}

const ClickOutside: FC<PropsWithChildren<ClickOutsideProps>> = ({
  children,
  onClick,
}) => {
  const localRef = useRef<HTMLElement | null>(null);
  useOnClickOutside(localRef, onClick);

  const childRef = isValidElement(children)
    ? (children as ReactElement<{ ref?: Ref<HTMLElement> }>).props?.ref
    : undefined;

  const mergedRef = useMergedRefs(localRef, childRef);

  if (!isValidElement(children)) return null;

  return cloneElement(children as ReactElement<{ ref?: Ref<HTMLElement> }>, {
    ref: mergedRef,
  });
};

export default ClickOutside;
