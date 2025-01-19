import { useEffect } from "react";
import type { RefObject } from "react";

const getFocusableModalElements = (element: HTMLElement) =>
  element.querySelectorAll<HTMLElement>(
    'a[href], button, textarea, input[type="text"], input[type="password"], input[type="radio"], input[type="checkbox"], select',
  );

function useTrapFocus(refObject: RefObject<HTMLElement>) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (!refObject.current || event.code !== "Tab") return;

      const focusable = Array.from(
        getFocusableModalElements(refObject.current),
      );

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];
      if (!lastElement || !firstElement) return;

      const focusOutside = document.activeElement
        ? !focusable.includes(document.activeElement as HTMLElement)
        : true;

      if (
        event.shiftKey &&
        (document.activeElement === firstElement || focusOutside)
      ) {
        lastElement.focus();
        event.preventDefault();
      } else if (
        !event.shiftKey &&
        (document.activeElement === lastElement || focusOutside)
      ) {
        firstElement.focus();
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [refObject]);
}

export default useTrapFocus;
