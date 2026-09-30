import { useCallback, useSyncExternalStore } from "react";
import { media } from "../../Theme/breakpoints";
import type { Media } from "../../Theme/breakpoints";

export type QueryInputFunction = (breakpoints: Media) => string;
type QueryInput = QueryInputFunction | string;

const getServerSnapshot = () => false;

const getMediaQueryList = (query: string) =>
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(query)
    : null;

/**
 * Returns whether the media query matches.
 * Returns `false` on the server and during hydration, the real value right after.
 */
export const useMediaSizes = (queryInput: QueryInput): boolean => {
  // A function input is a new function every render: memoize on the query string.
  const query = (
    typeof queryInput === "function" ? queryInput(media) : queryInput
  ).replace(/^\s*@media\s*/, "");

  const subscribe = useCallback(
    (onChange: () => void) => {
      const queryList = getMediaQueryList(query);
      if (!queryList) return () => {};

      queryList.addEventListener("change", onChange);
      return () => queryList.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => getMediaQueryList(query)?.matches ?? false,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
