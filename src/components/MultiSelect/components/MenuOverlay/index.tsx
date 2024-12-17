import React, { useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import Menu from "../../../Menu";
import SelectItem from "../MenuOverlayItem";
import generateUniqID from "../../../helpers/generateUniqID";
import Typography from "../../../Typography";
import Separator from "../../../Separator";
import { createGroupOptionString } from "../..";
import styles from "./index.module.scss";
import type { Coordinates } from "../../index.props";

const clx = classNames.bind(styles);

interface IOption {
  selected: boolean;
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

interface IMenuOverlayProps {
  groups: {
    title?: string;
    options: IOption[];
  }[];
  onChange: (key: string) => void;
}

const OFFSET_ITEMS_COUNT = 2;

const MenuOverlay = ({ groups, onChange }: IMenuOverlayProps) => {
  const [scrollView, setScrollView] = useState<Coordinates>({
    top: 0,
    height: 0,
  });
  const listRef = useRef<null | HTMLUListElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!rootRef || !rootRef.current) {
      return;
    }

    if (typeof rootRef.current.scrollTo === "function") {
      rootRef.current.scrollTo({
        top: scrollView.top - OFFSET_ITEMS_COUNT * scrollView.height,
      });
    }
  }, [scrollView, rootRef]);

  return (
    <div ref={rootRef} className={clx(styles.root)}>
      {groups.map((group, groupIndex) => (
        <div key={generateUniqID(groupIndex)}>
          <div className={clx(styles.title)}>
            <Typography
              style={{ color: "var(--typography-secondary)" }}
              size="s"
            >
              {group.title}
            </Typography>
          </div>
          <Separator />
          <Menu ref={listRef}>
            {group.options.map((option, optionIndex) => (
              <SelectItem
                setScrollView={setScrollView}
                option={option}
                key={generateUniqID(optionIndex)}
                onClick={() =>
                  onChange(createGroupOptionString(groupIndex, option.value))
                }
              />
            ))}
          </Menu>
        </div>
      ))}
    </div>
  );
};

export default MenuOverlay;
