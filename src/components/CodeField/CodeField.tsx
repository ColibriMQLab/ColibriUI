import React, {
  forwardRef,
  type MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./CodeField.module.scss";
import type { CodeFieldProps } from "./index.props";

export const ONLY_DIGITS_PATTERN = "^\\d+$";
export const ONLY_CHARS_PATTERN = "^[a-zA-Z]+$";
export const ONLY_DIGITS_AND_CHARS_PATTERN = "^[a-zA-Z0-9]+$";

const cx = (...classNames: Array<string | false | null | undefined>) =>
  classNames.filter(Boolean).join(" ");

const getPattern = (pattern: string | RegExp) =>
  typeof pattern === "string" ? new RegExp(pattern) : pattern;

const testSymbol = (pattern: RegExp, symbol: string) => {
  pattern.lastIndex = 0;
  return pattern.test(symbol);
};

const getPlaceholder = (placeholder: string | undefined, length: number) => {
  if (!placeholder) return [];
  return placeholder.length === 1
    ? Array<string>(length).fill(placeholder)
    : placeholder.slice(0, length).split("");
};

export const CodeField = forwardRef<HTMLInputElement, CodeFieldProps>(
  function CodeFieldComponent(
    {
      value,
      placeholder,
      codeLength = 6,
      caption,
      captionAlign = "left",
      width,
      view = "default",
      shape = "default",
      size = "l",
      disabled = false,
      isError = false,
      setIsError,
      allowedSymbols = ONLY_DIGITS_PATTERN,
      itemErrorBehavior = "remove-symbol",
      codeErrorBehavior = "remove-code",
      autoComplete = "one-time-code",
      inputMode = "numeric",
      autoFocus,
      className,
      style,
      onChange,
      onFullCodeEnter,
      onClick,
      onFocus,
      onBlur,
      onSelect,
      onPaste,
      onKeyDown,
      ...inputProps
    },
    forwardedRef,
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [internalValue, setInternalValue] = useState(
      value?.slice(0, codeLength) ?? "",
    );
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [invalidIndex, setInvalidIndex] = useState<number | null>(null);
    const [shaking, setShaking] = useState(false);
    const completedCode = useRef<string | null>(null);
    const fullCodeEffectMounted = useRef(false);
    const errorEffectMounted = useRef(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pattern = useMemo(() => getPattern(allowedSymbols), [allowedSymbols]);
    const currentValue =
      value === undefined ? internalValue : value.slice(0, codeLength);
    const placeholders = getPlaceholder(placeholder, codeLength);
    const items = Array.from(
      { length: codeLength },
      (_, index) => currentValue[index] ?? "",
    );

    const setInputRef = (element: HTMLInputElement | null) => {
      inputRef.current = element;
      if (typeof forwardedRef === "function") forwardedRef(element);
      else if (forwardedRef) forwardedRef.current = element;
    };

    const publishValue = useCallback(
      (nextValue: string) => {
        const normalized = nextValue.slice(0, codeLength);
        if (value === undefined) setInternalValue(normalized);
        onChange?.(normalized);
      },
      [codeLength, onChange, value],
    );

    const selectPosition = useCallback(
      (position: number, end = position) => {
        const input = inputRef.current;
        if (!input) return;
        const safePosition = Math.min(
          position,
          currentValue.length,
          codeLength,
        );
        input.setSelectionRange(
          safePosition,
          Math.min(end, currentValue.length),
        );
        setActiveIndex(Math.min(safePosition, codeLength - 1));
        setSelectedIndex(
          safePosition < end ? Math.min(safePosition, codeLength - 1) : null,
        );
      },
      [codeLength, currentValue.length],
    );

    const clearError = useCallback(() => {
      setInvalidIndex(null);
      setShaking(false);
      if (isError) setIsError?.(false);
    }, [isError, setIsError]);

    const showTemporaryItemError = useCallback(
      (rawValue: string, index: number) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setInvalidIndex(index);
        setShaking(true);

        if (itemErrorBehavior === "keep") {
          publishValue(rawValue);
          timerRef.current = setTimeout(() => setShaking(false), 300);
          return;
        }

        if (value === undefined) setInternalValue(rawValue);
        onChange?.(rawValue);
        timerRef.current = setTimeout(() => {
          const cleaned = rawValue
            .split("")
            .filter((symbol) => testSymbol(pattern, symbol))
            .join("");
          setInvalidIndex(null);
          setShaking(false);
          publishValue(cleaned);
          requestAnimationFrame(() => selectPosition(index));
        }, 300);
      },
      [
        itemErrorBehavior,
        onChange,
        pattern,
        publishValue,
        selectPosition,
        value,
      ],
    );

    useEffect(() => {
      if (value === undefined)
        setInternalValue((current) => current.slice(0, codeLength));
    }, [codeLength, value]);

    useEffect(
      () => () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      },
      [],
    );

    useEffect(() => {
      if (!fullCodeEffectMounted.current) {
        fullCodeEffectMounted.current = true;
        return;
      }
      if (currentValue.length !== codeLength) {
        completedCode.current = null;
        return;
      }
      if (completedCode.current !== currentValue) {
        completedCode.current = currentValue;
        onFullCodeEnter?.(currentValue);
      }
    }, [codeLength, currentValue, onFullCodeEnter]);

    useEffect(() => {
      if (!errorEffectMounted.current) {
        errorEffectMounted.current = true;
        return;
      }
      if (!isError) return;
      setShaking(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShaking(false);
        if (codeErrorBehavior === "remove-code") publishValue("");
        requestAnimationFrame(() => {
          inputRef.current?.focus();
          selectPosition(
            codeErrorBehavior === "remove-code" ? 0 : codeLength - 1,
            codeLength,
          );
        });
      }, 300);
    }, [codeErrorBehavior, codeLength, isError, publishValue, selectPosition]);

    const handleRootClick: MouseEventHandler<HTMLDivElement> = (event) => {
      onClick?.(event);
      if (event.defaultPrevented || disabled) return;
      inputRef.current?.focus();
      selectPosition(currentValue.length);
    };

    const rootWidth = typeof width === "number" ? `${width}rem` : width;
    const isGrouped = codeLength === 6;

    return (
      <div
        className={cx(
          styles.root,
          styles[view],
          styles[size],
          styles[shape],
          disabled && styles.disabled,
          className,
        )}
        style={{ ...style, width: rootWidth }}
        onClick={handleRootClick}
        role="presentation"
      >
        <div
          className={cx(
            styles.code_wrapper,
            (isError || shaking) && styles.code_error,
            shaking && styles.shaking,
          )}
        >
          {items.map((symbol, index) => (
            <React.Fragment key={index}>
              {isGrouped && index === codeLength / 2 && (
                <span className={styles.separator} />
              )}
              <span
                className={cx(
                  styles.item,
                  activeIndex === index && styles.focused,
                  selectedIndex === index && styles.selected,
                  invalidIndex === index && styles.item_error,
                )}
                aria-hidden="true"
                data-code-field-item=""
              >
                <span className={symbol ? styles.value : styles.placeholder}>
                  {symbol || placeholders[index] || ""}
                </span>
                {activeIndex === index && selectedIndex === null && (
                  <span className={styles.caret} />
                )}
              </span>
            </React.Fragment>
          ))}

          <input
            {...inputProps}
            ref={setInputRef}
            className={styles.native_input}
            type="text"
            value={currentValue}
            minLength={codeLength}
            maxLength={codeLength}
            autoComplete={autoComplete}
            inputMode={inputMode}
            autoFocus={autoFocus}
            disabled={disabled}
            spellCheck={false}
            onChange={(event) => {
              if (disabled) return;
              const rawValue = event.currentTarget.value.slice(0, codeLength);
              const nextInvalidIndex = rawValue
                .split("")
                .findIndex((symbol) => !testSymbol(pattern, symbol));
              clearError();
              if (nextInvalidIndex < 0) publishValue(rawValue);
              else if (itemErrorBehavior === "forbid-enter") {
                const cleaned = rawValue
                  .split("")
                  .filter((symbol) => testSymbol(pattern, symbol))
                  .join("");
                publishValue(cleaned);
                requestAnimationFrame(() => selectPosition(nextInvalidIndex));
              } else showTemporaryItemError(rawValue, nextInvalidIndex);
            }}
            onPaste={(event) => {
              onPaste?.(event);
              if (event.defaultPrevented || disabled) return;
              event.preventDefault();
              const pasted = event.clipboardData
                .getData("text/plain")
                .split("")
                .filter((symbol) => testSymbol(pattern, symbol));
              const start = event.currentTarget.selectionStart ?? 0;
              const end = event.currentTarget.selectionEnd ?? start;
              const nextValue = (
                pasted.length >= codeLength
                  ? pasted.join("")
                  : `${currentValue.slice(0, start)}${pasted.join("")}${currentValue.slice(end)}`
              ).slice(0, codeLength);
              clearError();
              publishValue(nextValue);
              requestAnimationFrame(() =>
                selectPosition(
                  Math.min(start + pasted.length, nextValue.length),
                ),
              );
            }}
            onKeyDown={(event) => {
              if (
                !disabled &&
                [
                  "ArrowLeft",
                  "ArrowRight",
                  "ArrowUp",
                  "ArrowDown",
                  "Delete",
                ].includes(event.key)
              ) {
                event.preventDefault();
              }
              onKeyDown?.(event);
            }}
            onFocus={(event) => {
              selectPosition(currentValue.length);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setActiveIndex(null);
              setSelectedIndex(null);
              onBlur?.(event);
            }}
            onSelect={(event) => {
              const start =
                event.currentTarget.selectionStart ?? currentValue.length;
              const end = event.currentTarget.selectionEnd ?? start;
              setActiveIndex(Math.min(start, codeLength - 1));
              setSelectedIndex(
                start < end ? Math.min(start, codeLength - 1) : null,
              );
              onSelect?.(event);
            }}
          />
        </div>

        {caption && (
          <div
            className={cx(styles.caption, isError && styles.caption_error)}
            style={{
              textAlign: captionAlign,
              alignSelf: captionAlign === "left" ? "flex-start" : "center",
            }}
          >
            {caption}
          </div>
        )}
      </div>
    );
  },
);
