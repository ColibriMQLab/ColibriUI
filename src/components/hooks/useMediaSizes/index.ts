import { useEffect, useState } from "react";
import { media } from "../../Theme/breakpoints";
import type { Media } from "../../Theme/breakpoints";

export type QueryInputFunction = (breakpoints: Media) => string;
type QueryInput = QueryInputFunction | string;

const supportMatchMedia =
  typeof window !== "undefined" && typeof window.matchMedia !== "undefined";

export const useMediaSizes = (queryInput: QueryInput) => {
  let query = typeof queryInput === "function" ? queryInput(media) : queryInput;

  query = query.replace(/^@media( ?)/m, "");

  const matchMedia = supportMatchMedia ? window.matchMedia : null;

  const [match, setMatch] = useState(() => {
    if (matchMedia) {
      return matchMedia(query).matches;
    }

    return false;
  });

  useEffect(() => {
    if (!matchMedia) return undefined;

    let active = true;

    const queryList = matchMedia(query);
    const updateMatch = () => {
      if (active) {
        setMatch(queryList.matches);
      }
    };
    updateMatch();
    queryList.addEventListener("change", updateMatch);

    return () => {
      active = false;
      queryList.removeEventListener("change", updateMatch);
    };
  });

  return match;
};
