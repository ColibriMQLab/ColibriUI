import type { PaginationItem } from "./index.props";

const range = (start: number, end: number) =>
  Array.from(
    { length: Math.max(0, end - start + 1) },
    (_, index) => start + index,
  );

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const toTotalPages = (totalPages: number) =>
  Math.max(1, Math.floor(totalPages) || 1);

export const getPaginationItems = (
  totalPages: number,
  page: number,
  siblingCount = 1,
  boundaryCount = 1,
): PaginationItem[] => {
  const total = toTotalPages(totalPages);
  const current = clamp(Math.floor(page) || 1, 1, total);
  const siblings = Math.max(0, Math.floor(siblingCount));
  const boundaries = Math.max(0, Math.floor(boundaryCount));
  const pages = [
    ...new Set([
      ...range(1, Math.min(boundaries, total)),
      ...range(
        Math.max(1, current - siblings),
        Math.min(total, current + siblings),
      ),
      ...range(Math.max(1, total - boundaries + 1), total),
    ]),
  ].sort((left, right) => left - right);

  return pages.flatMap<PaginationItem>((visiblePage, index) => {
    const previous = pages[index - 1];
    if (previous === undefined) return [visiblePage];
    if (visiblePage - previous === 2) return [previous + 1, visiblePage];
    if (visiblePage - previous > 2) {
      const ellipsis =
        visiblePage > current ? "end-ellipsis" : "start-ellipsis";
      return [ellipsis, visiblePage];
    }
    return [visiblePage];
  });
};

export const findEnabledPage = (
  from: number,
  direction: -1 | 1,
  total: number,
  disabledPages: ReadonlySet<number>,
) => {
  let candidate = from + direction;
  while (candidate >= 1 && candidate <= total && disabledPages.has(candidate)) {
    candidate += direction;
  }
  return candidate >= 1 && candidate <= total ? candidate : undefined;
};
