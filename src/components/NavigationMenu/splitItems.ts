export interface SplitInput {
  itemWidths: number[];
  /** Pinned items are always visible and go after the main items. */
  pinnedWidths: number[];
  moreWidth: number;
  containerWidth: number;
  /** CSS gap between items. */
  gap: number;
  /** Index of the active item or -1. */
  activeIndex: number;
  /** "More" is needed anyway, for example for `moreItems`. */
  forceMore: boolean;
}

export interface SplitResult {
  /** Indexes of the items left in the row, in the original order. */
  visible: number[];
  /** Indexes of the items moved to "More", in the original order. */
  hidden: number[];
}

const sum = (list: number[]) => list.reduce((acc, n) => acc + n, 0);

/**
 * Splits items into the row and "More".
 *
 * Items go from left to right while they fit; the first one that does not fit
 * and all after it move to "More". Space for the active item is reserved
 * first, so it stays in the row and its neighbours move instead. Every element
 * costs its width plus gap; the budget has one extra gap because N elements
 * have N − 1 gaps.
 */
export const splitItems = ({
  itemWidths,
  pinnedWidths,
  moreWidth,
  containerWidth,
  gap,
  activeIndex,
  forceMore,
}: SplitInput): SplitResult => {
  const all = itemWidths.map((_, index) => index);
  const cost = (width: number) => width + gap;
  const pinnedCost = sum(pinnedWidths.map(cost));

  if (
    !forceMore &&
    sum(itemWidths.map(cost)) + pinnedCost <= containerWidth + gap
  ) {
    return { visible: all, hidden: [] };
  }

  const hasActive = activeIndex >= 0 && activeIndex < itemWidths.length;
  let budget = containerWidth + gap - pinnedCost - cost(moreWidth);

  if (hasActive) budget -= cost(itemWidths[activeIndex]);

  const visible: number[] = [];

  for (let index = 0; index < itemWidths.length; index++) {
    if (index === activeIndex) continue;
    if (cost(itemWidths[index]) > budget) break;

    budget -= cost(itemWidths[index]);
    visible.push(index);
  }

  if (hasActive) {
    visible.push(activeIndex);
    visible.sort((a, b) => a - b);
  }

  return {
    visible,
    hidden: all.filter((index) => !visible.includes(index)),
  };
};

const isSameList = (a: number[], b: number[]) =>
  a.length === b.length && a.every((index, position) => index === b[position]);

export const isSameSplit = (a: SplitResult, b: SplitResult) =>
  isSameList(a.visible, b.visible) && isSameList(a.hidden, b.hidden);
