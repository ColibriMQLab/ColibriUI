import { useCallback, useEffect } from "react";

const stack: string[] = [];

/** Tracks open modals so only the topmost one reacts to Escape and Tab. */
export const useModalStack = (id: string) => {
  useEffect(() => {
    stack.push(id);

    return () => {
      const index = stack.lastIndexOf(id);
      if (index !== -1) stack.splice(index, 1);
    };
  }, [id]);

  return useCallback(() => stack[stack.length - 1] === id, [id]);
};
