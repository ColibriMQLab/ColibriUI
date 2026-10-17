import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "./helpers";
import { isSameSplit, splitItems } from "./splitItems";
import type { SplitResult } from "./splitItems";

interface Options {
  itemCount: number;
  pinnedCount: number;
  activeIndex: number;
  forceMore: boolean;
  /** Changes with the item labels to recalculate. */
  contentKey: string;
}

const getWidth = (element: Element | null) =>
  element ? element.getBoundingClientRect().width : 0;

/**
 * Measures the items and splits them into the row and "More".
 *
 * Widths come from a hidden measurer that always renders every item, so the
 * items inside "More" are measured too, for example after a web font loads.
 * ResizeObserver watches the container, the measurer and the "More" trigger.
 * Before the first measurement, and on the server, `split` is `null`.
 */
export const useOverflowSplit = ({
  itemCount,
  pinnedCount,
  activeIndex,
  forceMore,
  contentKey,
}: Options) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const measurerRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLLIElement>(null);
  const [split, setSplit] = useState<SplitResult | null>(null);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const measurer = measurerRef.current;

    if (!container || !measurer) return undefined;

    const recalculate = () => {
      const widths = Array.from(measurer.children, getWidth);
      const gap = listRef.current
        ? parseFloat(getComputedStyle(listRef.current).columnGap) || 0
        : 0;

      const next = splitItems({
        itemWidths: widths.slice(0, itemCount),
        pinnedWidths: widths.slice(itemCount, itemCount + pinnedCount),
        moreWidth: getWidth(moreRef.current),
        containerWidth: getWidth(container),
        gap,
        activeIndex,
        forceMore,
      });

      setSplit((prev) => (prev && isSameSplit(prev, next) ? prev : next));
    };

    recalculate();

    if (typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(recalculate);

    observer.observe(container);
    observer.observe(measurer);
    if (moreRef.current) observer.observe(moreRef.current);

    return () => observer.disconnect();
  }, [itemCount, pinnedCount, activeIndex, forceMore, contentKey]);

  return { split, containerRef, listRef, measurerRef, moreRef };
};
