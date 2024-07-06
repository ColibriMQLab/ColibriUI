import { useEffect } from "react";
import type { RefObject } from "react";

const getFocusableModalElements = (element: HTMLElement) =>
  element.querySelectorAll<HTMLElement>(
    'a[href], button, textarea, input[type="text"], input[type="password"], input[type="radio"], input[type="checkbox"], select',
  );

function useTrapFocus(refObject: RefObject<HTMLElement>) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!refObject.current || e.code !== "Tab") return;

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
        e.shiftKey &&
        (document.activeElement === firstElement || focusOutside)
      ) {
        lastElement.focus();
        e.preventDefault();
      } else if (
        !e.shiftKey &&
        (document.activeElement === lastElement || focusOutside)
      ) {
        firstElement.focus();
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);
}

export default useTrapFocus;
