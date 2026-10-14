import { useEffect, useRef } from "react";

const candidateSelector = [
  "a[href]",
  "button",
  "textarea",
  'input:not([type="hidden"])',
  "select",
  "[tabindex]",
  '[role="button"]',
].join(",");

// The selector only finds candidates: `[tabindex]` also matches disabled
// controls and `[role="button"]` alone does not make an element focusable.
const isTabbable = (node: HTMLElement) =>
  node.tabIndex >= 0 && !node.matches(":disabled");

const getFocusableElements = (element: HTMLElement) =>
  Array.from(element.querySelectorAll<HTMLElement>(candidateSelector)).filter(
    isTabbable,
  );

type FocusEntry = { element: HTMLElement; previousFocus: Element | null };

// Open traps in mount order, so a closing trap can hand its saved focus to
// traps opened on top of it.
const focusStack: FocusEntry[] = [];

/**
 * Moves focus into `element` when it mounts (first focusable element, or the
 * element itself, which needs tabIndex={-1}), keeps Tab inside it while
 * `isActive` returns true, and returns focus to the previously focused
 * element when it unmounts.
 */
export function useTrapFocus(
  element: HTMLElement | null,
  isActive?: () => boolean,
) {
  // Read during render, before children with autoFocus take focus.
  const previousFocusRef = useRef<Element | null>(null);
  if (!element && typeof document !== "undefined") {
    previousFocusRef.current = document.activeElement;
  }

  useEffect(() => {
    if (!element) return;

    const entry: FocusEntry = {
      element,
      previousFocus: previousFocusRef.current,
    };
    focusStack.push(entry);

    if (!element.contains(document.activeElement)) {
      (getFocusableElements(element)[0] ?? element).focus();
    }

    return () => {
      focusStack.splice(focusStack.indexOf(entry), 1);

      // Traps opened from inside this one would restore focus to a removed
      // element; give them the focus this trap saved instead.
      focusStack.forEach((other) => {
        if (element.contains(other.previousFocus)) {
          other.previousFocus = entry.previousFocus;
        }
      });

      // Focus inside another trap stays there. Focus removed with this
      // element falls back to body.
      const active = document.activeElement;
      const ownsFocus =
        !active || active === document.body || element.contains(active);
      const { previousFocus } = entry;
      if (
        ownsFocus &&
        previousFocus instanceof HTMLElement &&
        previousFocus.isConnected
      ) {
        previousFocus.focus();
      }
    };
  }, [element]);

  useEffect(() => {
    if (!element) return;

    const handler = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      if (isActive && !isActive()) return;

      const focusable = getFocusableElements(element);

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];
      if (!lastElement || !firstElement) {
        event.preventDefault();
        element.focus();
        return;
      }

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
  }, [element, isActive]);
}
