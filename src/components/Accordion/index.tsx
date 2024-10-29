import React, { useState, useEffect, useRef } from "react";

import classNames from "classnames/bind";
import { Chevron } from "../Icons";
import Typography from "../Typography";
import styles from "./Accordion.module.scss";
import type { FC, ReactNode, PropsWithChildren } from "react";

const clx = classNames.bind(styles);

type Props = {
  title: ReactNode;
  className?: string;
  boldTitle?: boolean;
};

const Accordion: FC<PropsWithChildren<Props>> = ({
  title,
  boldTitle = false,
  children,
  className,
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
    <div className={clx("root", className)}>
      <div className={clx("header")}>
        <button
          className={clx("button")}
          onClick={toggleAccordion}
          type="button"
        >
          <Chevron
            className={clx("chevron", { chevron_open: isOpen })}
            width={20}
            height={20}
          />
          <Typography
            className={clx("text")}
            fontWeight={boldTitle ? "bold" : "normal"}
          >
            {title}
          </Typography>
          <div className={clx("line")} />
        </button>
      </div>
      <div ref={contentRef} className={clx("content")}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
