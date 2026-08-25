import { useEffect } from "react";
import type { RefObject } from "react";

type AnyEvent = MouseEvent | TouchEvent;

/**
 * Universal ref type that supports both useRef and forwardRef.
 */
type AnyRef<T> = RefObject<T> | { current: T | null | undefined };

let element: AnyRef<HTMLElement> = { current: undefined };

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: AnyRef<T>,
  handler: (event: AnyEvent) => void,
) {
  useEffect(() => {
    const previous = element;
    element = ref;

    const listener = (event: AnyEvent) => {
      // Ensure this hook belongs to the current element.
      if (ref?.current !== element?.current) return;

      const el = element.current;
      if (!el) return;

      // Ignore clicks inside the element.
      if (el.contains(event.target as Node)) return;

      handler(event);
    };

    document.addEventListener("mousedown", listener, false);
    document.addEventListener("touchstart", listener, false);

    return () => {
      document.removeEventListener("mousedown", listener, false);
      document.removeEventListener("touchstart", listener, false);
      element = previous;
    };
  }, [handler, ref]);
}

export default useOnClickOutside;
