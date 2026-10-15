import React, { useEffect, useRef } from "react";
import { Button } from "../../../Button";
import { Plus } from "../../../Icons";
import { Swatch } from "../Swatch";
import styles from "./Palette.module.scss";
import type { KeyboardEvent } from "react";
import type { ColorPickerLabels, ColorPickerPreset } from "../../index.props";

interface PaletteProps {
  presets: ColorPickerPreset[];
  /** Normalized `#rrggbb` of the current color. */
  value: string | null;
  columns: number;
  labels: ColorPickerLabels;
  onSelect: (hex: string) => void;
  onAddClick: () => void;
  /** Tab or Shift+Tab leaves the palette. */
  onTabOut: () => void;
}

/**
 * Preset grid with the "+" button. A current color missing from the presets
 * is shown as an extra swatch before "+".
 */
export const Palette = ({
  presets,
  value,
  columns,
  labels,
  onSelect,
  onAddClick,
  onTabOut,
}: PaletteProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const hasPreset = presets.some((preset) => preset.value === value);
  const colors =
    value && !hasPreset ? [...presets, { value, label: value }] : presets;

  // The dropdown is portaled to the end of the document: move focus into it,
  // to the selected swatch or the first item ("+" when there are no colors).
  useEffect(() => {
    const root = rootRef.current;

    (
      root?.querySelector<HTMLElement>('[aria-checked="true"]') ??
      root?.querySelector<HTMLElement>("button")
    )?.focus();
  }, []);

  // Arrow keys move focus across the grid, Home/End go to the first and the
  // last item. Tab leaves the portaled palette through the trigger, so focus
  // continues from it, also inside a parent focus trap.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      onTabOut();
      return;
    }

    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>("button"),
    );
    const index = items.indexOf(event.target as HTMLButtonElement);
    const offsets: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -columns,
      ArrowDown: columns,
      Home: -index,
      End: items.length - 1 - index,
    };

    if (index === -1 || !(event.key in offsets)) return;

    event.preventDefault();
    items[index + offsets[event.key]]?.focus();
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- keys come from the focused items
    <div
      ref={rootRef}
      role="group"
      aria-label={labels.palette}
      className={styles.root}
      onKeyDown={handleKeyDown}
      style={{ gridTemplateColumns: `repeat(${columns}, auto)` }}
    >
      {colors.map((color) => (
        <Swatch
          key={color.value}
          color={color.value}
          label={color.label}
          selected={color.value === value}
          onClick={() => onSelect(color.value)}
        />
      ))}
      <Button
        className={styles.add}
        variant="secondary"
        size="xs"
        icon={<Plus width={12} height={12} aria-hidden="true" />}
        role="menuitem"
        aria-label={labels.addCustom}
        title={labels.addCustom}
        onClick={onAddClick}
      />
    </div>
  );
};
