import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import Menu from "../../../Menu";
import SelectItem from "../MenuOverlayItem";
import generateUniqID from "../../../helpers/generateUniqID";
import Typography from "../../../Typography";
import Separator from "../../../Separator";
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
  onChange: (value: string) => void;
}

const OFFSET_ITEMS_COUNT = 2;

const MenuOverlay = ({ groups, onChange }: IMenuOverlayProps) => {
  const [selected, setSelected] = useState<string[]>();
  const [scrollView, setScrollView] = useState<Coordinates>({
    top: 0,
    height: 0,
  });
  const listRef = useRef<null | HTMLUListElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    (option: IOption, key: string) => {
      onChange(option.value);
      setSelected(key.split(" "));
    },
    [onChange],
  );

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
      {groups.map((group, index) => (
        <div key={generateUniqID(index)}>
          <div className={clx(styles.title)}>
            <Typography
              style={{ color: "var(--typography-secondary)" }}
              size="s"
            >
              {group.title}
            </Typography>
          </div>
          <Separator />
          <Menu ref={listRef} selected={selected}>
            {group.options.map((option, index) => (
              <SelectItem
                setScrollView={setScrollView}
                option={option}
                key={generateUniqID(index)}
                onClick={() => handleSelect(option, `item-${index}`)}
              />
            ))}
          </Menu>
        </div>
      ))}
    </div>
  );
};

export default MenuOverlay;
