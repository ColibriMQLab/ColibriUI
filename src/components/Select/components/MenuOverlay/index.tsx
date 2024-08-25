import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import Menu from "../../../Menu";
import SelectItem from "../MenuOverlayItem";
import styles from "./index.module.scss";
import type { Coordinates, IOption } from "../../index.props";

const clx = classNames.bind(styles);

interface Props<T extends string> {
  options: {
    value: T;
    label: React.ReactNode;
    selected: boolean;
  }[];
  onChange: (value: T) => void;
}

const OFFSET_ITEMS_COUNT = 2;

const MenuOverlay = <T extends string>({ options, onChange }: Props<T>) => {
  const [selected, setSelected] = useState<string[]>();
  const [scrollView, setScrollView] = useState<Coordinates>({
    top: 0,
    height: 0,
  });
  const listRef = useRef<null | HTMLUListElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    (option: IOption<T>, key: string) => {
      onChange(option.value);
      setSelected(key.split(" "));
    },
    [onChange],
  );

  useLayoutEffect(() => {
    if (!rootRef || !rootRef.current) {
      return;
    }

    rootRef.current.scrollTo({
      top: scrollView.top - OFFSET_ITEMS_COUNT * scrollView.height,
    });
  }, [scrollView, rootRef]);

  return (
    <div
      ref={rootRef}
      className={clx(styles.root)}
      // style={{ maxHeight: `${listHeight}px` }}
    >
      <Menu ref={listRef} selected={selected}>
        {options.map((option, index) => (
          <SelectItem
            setScrollView={setScrollView}
            option={option}
            key={`item-${index}`}
            onClick={() => handleSelect(option, `item-${index}`)}
          />
        ))}
      </Menu>
    </div>
  );
};

export default MenuOverlay;
