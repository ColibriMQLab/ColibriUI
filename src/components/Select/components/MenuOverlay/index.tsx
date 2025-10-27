import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import Menu from "../../../Menu";
import SelectItem from "../MenuOverlayItem";
import styles from "./index.module.scss";
import type { Coordinates, IOption } from "../../index.props";

interface Props<T extends string> {
  options: {
    value: T;
    label: React.ReactNode;
    selected: boolean;
    disabled?: boolean;
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

    if (typeof rootRef.current.scrollTo === "function") {
      rootRef.current.scrollTo({
        top: scrollView.top - OFFSET_ITEMS_COUNT * scrollView.height,
      });
    }
  }, [scrollView, rootRef]);

  return (
    <div ref={rootRef} className={styles.root}>
      <Menu ref={listRef} selected={selected}>
        {options.map((option, index) => (
          <SelectItem
            setScrollView={setScrollView}
            option={option}
            isDisabled={option?.disabled || false}
            isPrevDisabled={
              options[index - 1] ? options[index - 1]?.disabled : false
            }
            key={index}
            onClick={() => handleSelect(option, `item-${index}`)}
          />
        ))}
      </Menu>
    </div>
  );
};

export default MenuOverlay;
