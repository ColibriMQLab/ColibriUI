import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

import { Input } from "../Input";
import { Chevron } from "../Icons/Chevron";
import { Cross } from "../Icons/Cross";
import styles from "./Autocomplete.module.scss";
import type { ChangeEvent, ForwardedRef, KeyboardEvent } from "react";
import type { AutocompleteOption, AutocompleteProps } from "./index.props";

const AutocompleteInner = <T extends AutocompleteOption>(
  props: AutocompleteProps<T>,
  forwardedRef: ForwardedRef<HTMLInputElement>,
) => {
  const {
    options,
    value,
    defaultValue = "",
    onValueChange,
    onOptionSelect,
    filterOption,
    renderOption,
    getOptionKey = (option) => option.value,
    minQueryLength = 0,
    open,
    defaultOpen = false,
    onOpenChange,
    openOnFocus = true,
    loading = false,
    loadingText = "Loading...",
    emptyText = "No results found",
    label,
    hint,
    hasError,
    success,
    clearable = true,
    clearLabel = "Clear value",
    size = "m",
    listMaxHeight = "var(--component-autocomplete-list-max-height)",
    containerClassName,
    className,
    disabled,
    readOnly,
    required,
    id,
    onFocus,
    onBlur,
    onKeyDown,
    ...inputProps
  } = props;

  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listId = `${inputId}-listbox`;
  const controlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);
  const query = controlled ? value : internalValue;
  const isOpen = open ?? internalOpen;

  const setInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const setOpen = useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next);
      onOpenChange?.(next);
      if (!next) setActiveIndex(-1);
    },
    [onOpenChange, open],
  );

  const filteredOptions = useMemo(() => {
    if (query.length < minQueryLength) return [];

    const normalized = query.trim().toLocaleLowerCase();
    const predicate =
      filterOption ??
      ((option: T) => option.label.toLocaleLowerCase().includes(normalized));

    return options.filter((option) => predicate(option, query));
  }, [filterOption, minQueryLength, options, query]);

  const showPopup =
    isOpen && !disabled && !readOnly && query.length >= minQueryLength;

  useEffect(() => {
    if (!showPopup) return undefined;

    const closeOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", closeOutside);
    return () => document.removeEventListener("mousedown", closeOutside);
  }, [setOpen, showPopup]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  useEffect(() => {
    if (activeIndex >= 0) {
      optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const changeValue = (next: string) => {
    if (!controlled) setInternalValue(next);
    onValueChange?.(next);
  };

  const selectOption = (option: T) => {
    if (option.disabled) return;

    changeValue(option.label);
    onOptionSelect?.(option);
    setOpen(false);
    inputRef.current?.focus();
  };

  const moveActive = (direction: 1 | -1) => {
    if (!showPopup) setOpen(true);
    if (!filteredOptions.length) return;

    let next = activeIndex;

    for (let attempts = 0; attempts < filteredOptions.length; attempts += 1) {
      next =
        (next + direction + filteredOptions.length) % filteredOptions.length;
      if (!filteredOptions[next].disabled) break;
    }

    setActiveIndex(next);
  };

  const handleChange = (
    _event: ChangeEvent<HTMLInputElement>,
    next: string,
  ) => {
    changeValue(next);
    setOpen(next.length >= minQueryLength);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(event.key === "ArrowDown" ? 1 : -1);
    } else if (event.key === "Enter" && showPopup && activeIndex >= 0) {
      event.preventDefault();
      selectOption(filteredOptions[activeIndex]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Home" && showPopup) {
      event.preventDefault();
      const first = filteredOptions.findIndex((option) => !option.disabled);
      setActiveIndex(first);
    } else if (event.key === "End" && showPopup) {
      event.preventDefault();
      let last = filteredOptions.length - 1;
      while (last >= 0 && filteredOptions[last].disabled) last -= 1;
      setActiveIndex(last);
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  const clearButton = clearable && query && !disabled && !readOnly && (
    <button
      type="button"
      className={styles.clear}
      aria-label={clearLabel}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => {
        changeValue("");
        setOpen(openOnFocus && minQueryLength === 0);
        inputRef.current?.focus();
      }}
    >
      <Cross />
    </button>
  );

  const endIcon = (
    <span className={styles["end-icons"]}>
      {clearButton}
      <Chevron
        className={clsx(styles.chevron, {
          [styles["chevron_open"]]: showPopup,
        })}
        aria-hidden="true"
      />
    </span>
  );

  const popup = showPopup && (
    <div className={styles.popup}>
      <ul
        id={listId}
        role="listbox"
        aria-label={typeof label === "string" ? label : undefined}
        className={styles.list}
        style={{ maxHeight: listMaxHeight }}
      >
        {loading ? (
          <li className={styles.message}>{loadingText}</li>
        ) : filteredOptions.length === 0 ? (
          <li className={styles.message}>{emptyText}</li>
        ) : (
          filteredOptions.map((option, index) => {
            const active = index === activeIndex;
            const selected = option.label === query;

            return (
              <li
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                id={`${listId}-${index}`}
                key={getOptionKey(option)}
                role="option"
                aria-selected={selected}
                aria-disabled={option.disabled || undefined}
                className={clsx(styles.option, {
                  [styles.active]: active,
                  [styles.selected]: selected,
                  [styles["option_disabled"]]: option.disabled,
                })}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => {
                  if (!option.disabled) setActiveIndex(index);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectOption(option);
                  }
                }}
                onClick={() => selectOption(option)}
              >
                {renderOption ? (
                  renderOption(option, { active, selected })
                ) : (
                  <>
                    {option.contentLeft && (
                      <span className={styles.side}>{option.contentLeft}</span>
                    )}
                    <span className={styles["option-text"]}>
                      <span>{option.label}</span>
                      {option.description && (
                        <small>{option.description}</small>
                      )}
                    </span>
                    {option.contentRight && (
                      <span className={styles.side}>{option.contentRight}</span>
                    )}
                  </>
                )}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={clsx(
        styles.root,
        styles[`size_${size}`],
        {
          [styles.success]: success,
        },
        containerClassName,
      )}
    >
      <Input
        {...inputProps}
        id={inputId}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showPopup}
        aria-controls={showPopup ? listId : undefined}
        aria-activedescendant={
          activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined
        }
        aria-invalid={hasError || undefined}
        autoComplete="off"
        className={clsx(styles.field, className)}
        controlAfter={popup}
        controlClassName={styles.control}
        controlRef={controlRef}
        disabled={disabled}
        endIcon={endIcon}
        hasError={hasError}
        hint={hint}
        inputRef={setInputRef}
        label={label}
        readOnly={readOnly}
        required={required}
        size={size}
        value={query}
        onBlur={onBlur}
        onChange={handleChange}
        onFocus={(event) => {
          onFocus?.(event);
          if (openOnFocus && query.length >= minQueryLength) setOpen(true);
        }}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export const Autocomplete = forwardRef(AutocompleteInner) as <
  T extends AutocompleteOption = AutocompleteOption,
>(
  props: AutocompleteProps<T> & { ref?: ForwardedRef<HTMLInputElement> },
) => React.ReactElement;
