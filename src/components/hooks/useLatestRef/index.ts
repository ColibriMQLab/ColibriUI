import { useEffect, useRef } from "react";

/**
 * Keeps the latest value in a ref. Effects read callbacks from it, so a new
 * inline callback from the parent does not restart them.
 */
export const useLatestRef = <T>(value: T) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
};
