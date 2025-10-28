import React, { useState, useEffect, useRef } from "react";

import clsx from "clsx";
import { Chevron } from "../Icons";
import Typography from "../Typography";
import styles from "./Accordion.module.scss";
import type { FC, ReactNode, PropsWithChildren } from "react";

type Props = {
  title: ReactNode;
  className?: string;
  boldTitle?: boolean;
  tabIndex?: number;
};

const Accordion: FC<PropsWithChildren<Props>> = ({
  title,
  boldTitle = false,
  children,
  className,
  tabIndex,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.blockSize = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.header}>
        <button
          className={styles.button}
          onClick={toggleAccordion}
          type="button"
          role="button"
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
        {children}
      </div>
    </div>
  );
};

export default Accordion;
