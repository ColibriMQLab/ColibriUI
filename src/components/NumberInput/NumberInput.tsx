import React, { forwardRef, useId, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Cross from "../Icons/Cross";
import Input from "../Input";

import styles from "./NumberInput.module.scss";
import type {
  NumberInputGroupStyle,
  NumberInputProps,
  NumberInputValues,
} from "./index.props";

const groupInteger = (
  integer: string,
  separator: string | false,
  style: NumberInputGroupStyle,
) => {
  if (!separator || style === "none") return integer;
  const group = style === "wan" ? 4 : 3;
  if (style !== "lakh") {
    return integer.replace(
      new RegExp(`\\B(?=(\\d{${group}})+(?!\\d))`, "g"),
      separator,
    );
  }
  if (integer.length <= 3) return integer;
  const tail = integer.slice(-3);
  const head = integer.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, separator);
  return `${head}${separator}${tail}`;
};

const normalize = (
  input: string,
  decimalSeparator: string,
  decimalScale: number,
  allowNegative: boolean,
  allowLeadingZeros: boolean,
) => {
  const negative = allowNegative && input.replace(/^\s+/, "").startsWith("-");
  const escapedSeparator = decimalSeparator.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
  const cleaned = input.replace(
    new RegExp(`[^0-9${escapedSeparator}]`, "g"),
    "",
  );
  const separatorIndex = cleaned.indexOf(decimalSeparator);
  const rawInteger =
    (separatorIndex < 0 ? cleaned : cleaned.slice(0, separatorIndex)) ||
    (separatorIndex >= 0 ? "0" : "");
  const fraction =
    separatorIndex < 0
      ? ""
      : cleaned
          .slice(separatorIndex + decimalSeparator.length)
          .replace(/\D/g, "")
          .slice(0, decimalScale);
  const integer = allowLeadingZeros
    ? rawInteger
    : rawInteger.replace(/^0+(?=\d)/, "");
  const decimalEntered = separatorIndex >= 0 && decimalScale > 0;
  return `${negative ? "-" : ""}${integer}${decimalEntered ? `.${fraction}` : ""}`;
};

const format = (
  raw: string,
  thousandSeparator: string | false,
  decimalSeparator: string,
  groupStyle: NumberInputGroupStyle,
  decimalScale: number,
  fixedDecimalScale: boolean,
  prefix: string,
  suffix: string,
) => {
  if (!raw) return "";
  const negative = raw.startsWith("-");
  const unsigned = negative ? raw.slice(1) : raw;
  const [integer = "", fraction = ""] = unsigned.split(".");
  const shouldShowDecimal =
    decimalScale > 0 && (raw.includes(".") || fixedDecimalScale);
  const decimals = fixedDecimalScale
    ? fraction.padEnd(decimalScale, "0").slice(0, decimalScale)
    : fraction.slice(0, decimalScale);

  return `${negative ? "-" : ""}${prefix}${groupInteger(
    integer || "0",
    thousandSeparator,
    groupStyle,
  )}${shouldShowDecimal ? decimalSeparator : ""}${decimals}${suffix}`;
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, forwardedRef) => {
    const {
      value,
      defaultValue = "",
      onValueChange,
      thousandSeparator = " ",
      decimalSeparator = ".",
      thousandsGroupStyle = "thousand",
      decimalScale = 3,
      fixedDecimalScale = false,
      allowNegative = false,
      allowLeadingZeros = false,
      prefix = "",
      suffix = "",
      min,
      max,
      isAllowed,
      clearable = false,
      clearLabel = "Clear",
      className,
      disabled,
      readOnly,
      id,
      inputRef,
      endIcon,
      onFocus,
      onBlur,
      ...inputProps
    } = props;
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const controlled = value !== undefined;
    const options = {
      decimalSeparator,
      decimalScale: Math.max(0, decimalScale),
      allowNegative,
      allowLeadingZeros,
    };
    const normalizeValue = (next: string) =>
      normalize(
        next.replace(".", decimalSeparator),
        options.decimalSeparator,
        options.decimalScale,
        options.allowNegative,
        options.allowLeadingZeros,
      );
    const [internalValue, setInternalValue] = useState(() =>
      normalizeValue(defaultValue),
    );
    const rawValue = controlled ? normalizeValue(value) : internalValue;
    const localInputRef = useRef<HTMLInputElement | null>(null);
    const setRef = (node: HTMLInputElement | null) => {
      localInputRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
      if (typeof inputRef === "function") inputRef(node);
      else if (inputRef) inputRef.current = node;
    };
    const formattedValue = useMemo(
      () =>
        format(
          rawValue,
          thousandSeparator,
          decimalSeparator,
          thousandsGroupStyle,
          options.decimalScale,
          fixedDecimalScale,
          prefix,
          suffix,
        ),
      [
        rawValue,
        thousandSeparator,
        decimalSeparator,
        thousandsGroupStyle,
        options.decimalScale,
        fixedDecimalScale,
        prefix,
        suffix,
      ],
    );

    const emit = (nextRaw: string) => {
      const nextFormatted = format(
        nextRaw,
        thousandSeparator,
        decimalSeparator,
        thousandsGroupStyle,
        options.decimalScale,
        fixedDecimalScale,
        prefix,
        suffix,
      );
      const numeric =
        nextRaw === "" || nextRaw === "-" || nextRaw.endsWith(".")
          ? Number(nextRaw.slice(0, -1))
          : Number(nextRaw);
      const values: NumberInputValues = {
        value: nextRaw,
        formattedValue: nextFormatted,
        floatValue:
          nextRaw !== "" && nextRaw !== "-" && Number.isFinite(numeric)
            ? numeric
            : undefined,
      };
      if (
        (min !== undefined &&
          values.floatValue !== undefined &&
          values.floatValue < min) ||
        (max !== undefined &&
          values.floatValue !== undefined &&
          values.floatValue > max) ||
        isAllowed?.(values) === false
      ) {
        return;
      }
      if (!controlled) setInternalValue(nextRaw);
      onValueChange?.(values);
    };

    const handleChange = (text: string, caret: number | null) => {
      const beforeCaret = text.slice(0, caret ?? text.length);
      const digitsBeforeCaret = (beforeCaret.match(/\d/g) ?? []).length;
      emit(
        normalize(
          text,
          decimalSeparator,
          options.decimalScale,
          allowNegative,
          allowLeadingZeros,
        ),
      );
      requestAnimationFrame(() => {
        const node = localInputRef.current;
        if (!node || document.activeElement !== node) return;
        let digits = 0;
        let position = prefix.length + (node.value.startsWith("-") ? 1 : 0);
        for (
          ;
          position < node.value.length && digits < digitsBeforeCaret;
          position += 1
        ) {
          if (/\d/.test(node.value[position])) digits += 1;
        }
        node.setSelectionRange(position, position);
      });
    };

    const clearButton = clearable && rawValue && !disabled && !readOnly && (
      <button
        type="button"
        className={styles.clear}
        aria-label={clearLabel}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => emit("")}
      >
        <Cross width={20} height={20} aria-hidden="true" />
      </button>
    );
    const composedEndIcon =
      endIcon || clearButton ? (
        <span className={styles.end_content}>
          {endIcon}
          {clearButton}
        </span>
      ) : undefined;

    return (
      <Input
        {...inputProps}
        id={inputId}
        className={clsx(styles.field, className)}
        type="text"
        inputMode={options.decimalScale > 0 ? "decimal" : "numeric"}
        value={formattedValue}
        disabled={disabled}
        readOnly={readOnly}
        inputRef={setRef}
        endIcon={composedEndIcon}
        onChange={(event) =>
          handleChange(event.target.value, event.target.selectionStart)
        }
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  },
);

NumberInput.displayName = "NumberInput";
