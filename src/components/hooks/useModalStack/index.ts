import { useCallback, useEffect } from "react";

const stack: string[] = [];

/**
 * Tracks open modals so only the topmost one reacts to Escape and Tab.
 * An inactive entry is not registered and counts as topmost only while no
 * modal is open.
 */
export const useModalStack = (id: string, active = true) => {
  useEffect(() => {
    if (!active) return;
    stack.push(id);

    return () => {
      const index = stack.lastIndexOf(id);
      if (index !== -1) stack.splice(index, 1);
    };
  }, [id, active]);

  return useCallback(
    () => (stack.length ? stack[stack.length - 1] === id : !active),
    [id, active],
  );
};
