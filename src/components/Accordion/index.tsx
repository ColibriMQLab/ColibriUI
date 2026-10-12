import React, { useLayoutEffect, useRef, useState } from "react";

import clsx from "clsx";
import { Chevron } from "../Icons";
import { Typography } from "../Typography";
import styles from "./Accordion.module.scss";
import type { FC } from "react";
import type { AccordionProps } from "./index.props";

export const Accordion: FC<AccordionProps> = ({
  title,
  boldTitle = false,
  children,
  className,
  tabIndex,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => setIsOpen(!isOpen);

  useLayoutEffect(() => {
    const content = contentRef.current;
    const inner = innerRef.current;
    if (!content || !inner) return;

    if (!isOpen) {
      content.style.blockSize = "0";
      return;
    }

    const updateBlockSize = () => {
      content.style.blockSize = `${inner.scrollHeight}px`;
    };
    updateBlockSize();

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(updateBlockSize);
    observer.observe(inner);
    return () => observer.disconnect();
  }, [isOpen]);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.header}>
        <button
          className={styles.button}
          onClick={toggleAccordion}
          type="button"
          aria-expanded={isOpen}
          tabIndex={tabIndex}
          aria-label="Toggle"
        >
          <Chevron
            className={clsx(styles.chevron, {
              [styles["chevron_open"]]: Boolean(isOpen),
            })}
            width={20}
            height={20}
          />
          <Typography
            className={styles.text}
            fontWeight={boldTitle ? "bold" : "normal"}
          >
            {title}
          </Typography>
          <div className={styles.line} />
        </button>
      </div>
      <div ref={contentRef} className={styles.content}>
        <div ref={innerRef} className={styles.inner}>
          {children}
        </div>
      </div>
    </div>
  );
};
