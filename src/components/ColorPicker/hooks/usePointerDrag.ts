import { useCallback, useEffect, useRef } from "react";
import { clamp } from "../utils/color";
import type { PointerEvent as ReactPointerEvent } from "react";

/** Pointer position inside the element, 0–1 on each axis. */
export interface DragPosition {
  x: number;
  y: number;
}

/**
 * Dragging inside an element with Pointer Events (mouse, touch, pen).
 * Pointer capture keeps tracking outside the element without document
 * listeners. The element needs `touch-action: none`.
 */
export const usePointerDrag = <T extends HTMLElement>(
  onMove: (position: DragPosition) => void,
) => {
  const ref = useRef<T>(null);
  const onMoveRef = useRef(onMove);

  useEffect(() => {
    onMoveRef.current = onMove;
  });

  const move = useCallback((event: ReactPointerEvent<T>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    onMoveRef.current({
      x: clamp((event.clientX - rect.left) / rect.width),
      y: clamp((event.clientY - rect.top) / rect.height),
    });
  }, []);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<T>) => {
      if (event.button !== 0 || !ref.current) return;

      // preventDefault stops text selection but also focus, so focus manually.
      event.preventDefault();
      ref.current.setPointerCapture(event.pointerId);
      ref.current.focus();
      move(event);
    },
    [move],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<T>) => {
      if (ref.current?.hasPointerCapture(event.pointerId)) move(event);
    },
    [move],
  );

  const onPointerUp = useCallback((event: ReactPointerEvent<T>) => {
    if (ref.current?.hasPointerCapture(event.pointerId)) {
      ref.current.releasePointerCapture(event.pointerId);
    }
  }, []);

  return {
    ref,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
};
