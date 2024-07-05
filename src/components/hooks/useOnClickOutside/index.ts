import { useEffect } from "react";
import type { MutableRefObject, RefObject } from "react";

type AnyEvent = MouseEvent | TouchEvent;
type Ref<T> = RefObject<T> | MutableRefObject<T | undefined>;

let element: Ref<HTMLElement> = { current: undefined };

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | MutableRefObject<T | undefined>,
  handler: (e: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    const previous = element;
    element = ref;

    const listener = (event: AnyEvent) => {
      if (ref?.current !== element?.current) return;

      if (element.current?.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener(`mousedown`, listener, false);
    document.addEventListener(`touchstart`, listener, false);

    return () => {
      document.removeEventListener(`mousedown`, listener, false);
      document.removeEventListener(`touchstart`, listener, false);

      element = previous;
    };
  }, [handler, ref]);
}

export default useOnClickOutside;
