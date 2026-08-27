import React, {
  type ClipboardEventHandler,
  type FocusEventHandler,
  forwardRef,
  type KeyboardEventHandler,
  type SyntheticEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { Edit } from "../Icons";
import styles from "./Editable.module.scss";
import type { EditableProps } from "./index.props";

const placeCaretAtEnd = (element: HTMLElement) => {
  const selection = window.getSelection();
  if (!selection) return;

  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
};

const insertTextAtSelection = (element: HTMLElement, text: string) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    element.append(document.createTextNode(text));
    placeCaretAtEnd(element);
    return;
  }

  const range = selection.getRangeAt(0);
  range.deleteContents();
  const node = document.createTextNode(text);
  range.insertNode(node);
  range.setStartAfter(node);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

export const Editable = forwardRef<HTMLDivElement, EditableProps>(
  function EditableComponent(
    {
      value,
      textComponent: TextComponent = "span",
      icon = <Edit className={styles.default_icon} aria-hidden="true" />,
      placeholder = "",
      maxLength,
      name,
      disabled = false,
      spellCheck = false,
      className,
      onChange,
      onBlur,
      onPaste,
      ...rest
    },
    forwardedRef,
  ) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [currentValue, setCurrentValue] = useState(value ?? "");
    const [isEditing, setIsEditing] = useState(false);
    const lastValidValue = useRef(value ?? "");

    useImperativeHandle(
      forwardedRef,
      () => editorRef.current as HTMLDivElement,
      [],
    );

    useEffect(() => {
      if (value === undefined || value === lastValidValue.current) return;
      lastValidValue.current = value;
      setCurrentValue(value);
      if (editorRef.current) editorRef.current.textContent = value;
    }, [value]);

    const commitInput = useCallback(
      (event: SyntheticEvent<HTMLDivElement>) => {
        const editor = editorRef.current;
        if (!editor) return;

        const nextValue = editor.textContent ?? "";
        if (maxLength !== undefined && nextValue.length > maxLength) {
          editor.textContent = lastValidValue.current;
          placeCaretAtEnd(editor);
          return;
        }

        lastValidValue.current = nextValue;
        setCurrentValue(nextValue);
        onChange?.(event, nextValue);
      },
      [maxLength, onChange],
    );

    const handleFocus: FocusEventHandler<HTMLDivElement> = (event) => {
      setIsEditing(true);
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(event.currentTarget);
      selection?.removeAllRanges();
      selection?.addRange(range);
    };

    const handleBlur: FocusEventHandler<HTMLDivElement> = (event) => {
      setIsEditing(false);
      window.getSelection()?.removeAllRanges();
      if (event.currentTarget.innerHTML === "<br>")
        event.currentTarget.innerHTML = "";
      onBlur?.(event);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
      if (event.key === "Enter") event.preventDefault();
      if (event.key === "Enter" || event.key === "Escape")
        event.currentTarget.blur();
    };

    const handlePaste: ClipboardEventHandler<HTMLDivElement> = (event) => {
      event.preventDefault();
      let text = event.clipboardData
        .getData("text/plain")
        .replace(/[\r\n]+/g, " ");

      if (maxLength !== undefined) {
        const selectionLength = window.getSelection()?.toString().length ?? 0;
        const available = Math.max(
          0,
          maxLength - currentValue.length + selectionLength,
        );
        text = text.slice(0, available);
      }

      insertTextAtSelection(event.currentTarget, text);
      commitInput(event);
      onPaste?.(event);
    };

    const focusEditor = () => {
      if (!disabled) editorRef.current?.focus();
    };

    return (
      <span
        {...rest}
        className={[
          styles.root,
          disabled ? styles.disabled : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <TextComponent
          ref={editorRef}
          className={styles.editor}
          role="textbox"
          aria-label={placeholder || undefined}
          aria-disabled={disabled || undefined}
          aria-placeholder={placeholder || undefined}
          contentEditable={!disabled}
          suppressContentEditableWarning
          spellCheck={spellCheck}
          onInput={commitInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        >
          {currentValue}
        </TextComponent>

        {!currentValue && !isEditing && placeholder && (
          <span
            className={styles.placeholder}
            onClick={focusEditor}
            aria-hidden="true"
          >
            {placeholder}
          </span>
        )}

        {name && <input type="hidden" name={name} value={currentValue} />}

        {icon != null && !isEditing && (
          <button
            className={styles.edit_button}
            type="button"
            onClick={focusEditor}
            disabled={disabled}
            aria-label="Edit"
          >
            {icon}
          </button>
        )}
      </span>
    );
  },
);
