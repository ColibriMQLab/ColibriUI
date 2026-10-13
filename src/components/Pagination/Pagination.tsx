import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { Chevron } from "../Icons/Chevron";
import { Input } from "../Input";
import { Select } from "../Select";
import {
  clamp,
  findEnabledPage,
  getPaginationItems,
  toTotalPages,
} from "./helpers";
import styles from "./Pagination.module.scss";
import type { PaginationProps } from "./index.props";

const NO_PAGES: readonly number[] = [];
const DEFAULT_PAGE_SIZE_OPTIONS: readonly number[] = [20, 50, 100];
const defaultPageLabel = (page: number) => `Page ${page}`;

export const Pagination = ({
  totalPages,
  page,
  defaultPage = 1,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  disabledPages = NO_PAGES,
  disabled = false,
  mode = "default",
  size = "m",
  pageSize,
  defaultPageSize = 20,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onPageSizeChange,
  showPageSize = false,
  showQuickJump = false,
  helperText,
  previousLabel = "Previous page",
  nextLabel = "Next page",
  pageLabel = defaultPageLabel,
  quickJumpLabel = "Go to page",
  pageSizeLabel = "Per page",
  className,
  ref,
  "aria-label": ariaLabel = "Pagination",
  ...props
}: PaginationProps) => {
  const total = toTotalPages(totalPages);
  const [internalPage, setInternalPage] = useState(() =>
    clamp(defaultPage, 1, total),
  );
  const currentPage = clamp(page ?? internalPage, 1, total);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);
  const currentPageSize = pageSize ?? internalPageSize;
  const [quickJumpDraft, setQuickJumpDraft] = useState<string | null>(null);
  const disabledSet = useMemo(() => new Set(disabledPages), [disabledPages]);
  const items = useMemo(
    () => getPaginationItems(total, currentPage, siblingCount, boundaryCount),
    [total, currentPage, siblingCount, boundaryCount],
  );
  const pageSizeSelectOptions = useMemo(
    () =>
      pageSizeOptions.map((option) => ({
        value: String(option),
        label: option,
      })),
    [pageSizeOptions],
  );

  const previousPage = findEnabledPage(currentPage, -1, total, disabledSet);
  const nextPage = findEnabledPage(currentPage, 1, total, disabledSet);

  const changePage = (nextValue: number) => {
    const next = clamp(Math.floor(nextValue), 1, total);
    if (disabled || disabledSet.has(next) || next === currentPage) return;
    if (page === undefined) setInternalPage(next);
    onPageChange?.(next);
  };

  const commitQuickJump = () => {
    if (quickJumpDraft === null) return;
    const parsed = Number(quickJumpDraft);
    if (quickJumpDraft.trim() !== "" && Number.isInteger(parsed)) {
      changePage(parsed);
    }
    setQuickJumpDraft(null);
  };

  const changePageSize = (next: number) => {
    if (pageSize === undefined) setInternalPageSize(next);
    onPageSizeChange?.(next);
  };

  const hasActions = showQuickJump || showPageSize || Boolean(helperText);

  return (
    <nav
      {...props}
      ref={ref}
      aria-label={ariaLabel}
      className={clsx(
        styles.root,
        styles[`size_${size}`],
        { [styles.root_disabled]: disabled },
        className,
      )}
    >
      <div className={styles.main}>
        <button
          type="button"
          className={styles.arrow}
          aria-label={previousLabel}
          disabled={disabled || previousPage === undefined}
          onClick={() => {
            if (previousPage !== undefined) changePage(previousPage);
          }}
        >
          <Chevron
            className={styles.arrow_previous}
            width={16}
            height={16}
            aria-hidden="true"
          />
        </button>
        {mode === "compact" ? (
          <span className={styles.counter} aria-live="polite">
            <strong>{currentPage}</strong>
            <span>/</span>
            {total}
          </span>
        ) : (
          <div className={styles.pages}>
            {items.map((item) =>
              typeof item === "number" ? (
                <button
                  type="button"
                  key={item}
                  className={clsx(styles.page, {
                    [styles.page_current]: item === currentPage,
                  })}
                  aria-label={pageLabel(item)}
                  aria-current={item === currentPage ? "page" : undefined}
                  disabled={disabled || disabledSet.has(item)}
                  onClick={() => changePage(item)}
                >
                  {item}
                </button>
              ) : (
                <span key={item} className={styles.ellipsis} aria-hidden="true">
                  …
                </span>
              ),
            )}
          </div>
        )}
        <button
          type="button"
          className={styles.arrow}
          aria-label={nextLabel}
          disabled={disabled || nextPage === undefined}
          onClick={() => {
            if (nextPage !== undefined) changePage(nextPage);
          }}
        >
          <Chevron
            className={styles.arrow_next}
            width={16}
            height={16}
            aria-hidden="true"
          />
        </button>
      </div>

      {hasActions && (
        <div className={styles.actions}>
          {showQuickJump && (
            <Input
              className={styles.jump}
              size={size}
              label={quickJumpLabel}
              inputMode="numeric"
              value={quickJumpDraft ?? String(currentPage)}
              disabled={disabled}
              onChange={(_, value) => setQuickJumpDraft(value)}
              onBlur={commitQuickJump}
              onKeyDown={(event) => {
                if (event.key === "Enter") commitQuickJump();
              }}
            />
          )}
          {showPageSize && (
            <Select
              size={size}
              label={pageSizeLabel}
              options={pageSizeSelectOptions}
              value={String(currentPageSize)}
              disabled={disabled}
              onChange={(value) => changePageSize(Number(value))}
            />
          )}
          {helperText && <div className={styles.helper}>{helperText}</div>}
        </div>
      )}
    </nav>
  );
};
