import React, { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./Dropzone.module.scss";
import type { DropzoneProps } from "./index.props";
import type { CSSProperties, DragEventHandler } from "react";

const cx = (...classNames: Array<string | false | null | undefined>) =>
  classNames.filter(Boolean).join(" ");

const toCssSize = (value: string | number | undefined, fallback: string) => {
  if (value === undefined) return fallback;
  return typeof value === "number" ? `${value}px` : value;
};

const UploadIcon = () => (
  <svg
    className={styles["default-icon"]}
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M11 14.6V5.8L7.7 9.1 6.3 7.7 12 2l5.7 5.7-1.4 1.4L13 5.8v8.8h-2ZM4 22a2 2 0 0 1-2-2v-5h2v5h16v-5h2v5a2 2 0 0 1-2 2H4Z" />
  </svg>
);

export const Dropzone = forwardRef<HTMLInputElement, DropzoneProps>(
  function DropzoneInput(
    {
      files,
      title,
      description,
      icon,
      iconPlacement = "left",
      size = "m",
      view = "default",
      stretch = false,
      width,
      height,
      disabled = false,
      accept,
      multiple = false,
      validator,
      className,
      style,
      onDrop,
      onChoseFiles,
      onChange,
      onClick,
      onDragEnter,
      onDragLeave,
      onDragOver,
      ...inputProps
    },
    forwardedRef,
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dragDepth = useRef(0);
    const [isActive, setIsActive] = useState(false);
    const [internalFiles, setInternalFiles] = useState<File[]>([]);
    const currentFiles = files ?? internalFiles;

    const setInputRef = (element: HTMLInputElement | null) => {
      inputRef.current = element;
      if (typeof forwardedRef === "function") forwardedRef(element);
      else if (forwardedRef) forwardedRef.current = element;
    };

    useEffect(() => {
      if (inputRef.current) inputRef.current.value = "";
    }, [currentFiles]);

    const validateFiles = async (rawFiles: FileList | File[]) => {
      const selectedFiles = Array.from(rawFiles);
      return validator
        ? validator(selectedFiles)
        : { acceptedFiles: selectedFiles };
    };

    const openFileDialog = () => {
      if (!disabled) inputRef.current?.click();
    };

    const handleDragEnter: DragEventHandler<HTMLDivElement> = (event) => {
      if (disabled) return;
      event.preventDefault();
      event.stopPropagation();
      dragDepth.current += 1;
      if (dragDepth.current === 1) {
        setIsActive(true);
        onDragEnter?.(event);
      }
    };

    const handleDragLeave: DragEventHandler<HTMLDivElement> = (event) => {
      if (disabled) return;
      event.preventDefault();
      event.stopPropagation();
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) {
        setIsActive(false);
        onDragLeave?.(event);
      }
    };

    const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
      if (disabled) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
      onDragOver?.(event);
    };

    const handleDrop: DragEventHandler<HTMLDivElement> = async (event) => {
      if (disabled) return;
      event.preventDefault();
      event.stopPropagation();
      dragDepth.current = 0;
      setIsActive(false);

      if (!event.dataTransfer.files.length) return;
      const result = await validateFiles(event.dataTransfer.files);
      await onDrop?.(result);
      event.dataTransfer.clearData();
    };

    const rootStyle = {
      ...style,
      "--dropzone-width": stretch ? "100%" : toCssSize(width, "fit-content"),
      "--dropzone-height": stretch ? "100%" : toCssSize(height, "fit-content"),
    } as CSSProperties;

    return (
      <div
        className={cx(
          styles.root,
          styles[size],
          styles[view],
          iconPlacement === "top" && styles["icon-top"],
          stretch && styles.stretch,
          isActive && styles.active,
          disabled && styles.disabled,
          className,
        )}
        style={rootStyle}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-disabled={disabled || undefined}
        onClick={(event) => {
          // A programmatic input.click() bubbles back to the root.
          if (event.target === inputRef.current) return;
          onClick?.(event);
          if (!event.defaultPrevented) openFileDialog();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openFileDialog();
          }
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className={styles.content}>
          <span className={styles.icon}>{icon ?? <UploadIcon />}</span>
          <span className={styles.text}>
            {title != null && <span className={styles.title}>{title}</span>}
            {description != null && (
              <span className={styles.description}>{description}</span>
            )}
          </span>
        </div>

        <input
          {...inputProps}
          ref={setInputRef}
          className={styles.input}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          tabIndex={-1}
          onChange={async (event) => {
            const input = event.currentTarget;
            onChange?.(event);
            if (event.defaultPrevented || disabled || !input.files?.length)
              return;

            const result = await validateFiles(input.files);
            if (files === undefined) setInternalFiles(result.acceptedFiles);
            await onChoseFiles?.(result);
            input.value = "";
          }}
        />
      </div>
    );
  },
);
