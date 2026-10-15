import React, { useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import { CustomColorModal } from "./components/CustomColorModal";
import { Palette } from "./components/Palette";
import { COLOR_PICKER_PRESETS, DEFAULT_LABELS } from "./presets";
import { normalizeHex } from "./utils/color";
import styles from "./ColorPicker.module.scss";
import type { ColorPickerPreset, ColorPickerProps } from "./index.props";

const normalizePresets = (presets: ColorPickerPreset[]) =>
  presets.flatMap((preset) => {
    const value = normalizeHex(preset.value);

    return value ? [{ ...preset, value }] : [];
  });

export const ColorPicker = ({
  value,
  onChange,
  presets = COLOR_PICKER_PRESETS,
  columns = 6,
  disabled,
  placement = "bottom-start",
  zIndex,
  labels: labelsProp,
  children,
}: ColorPickerProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isCustomOpen, setCustomOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const labels = { ...DEFAULT_LABELS, ...labelsProp };
  const current = value ? normalizeHex(value) : null;
  const normalizedPresets = useMemo(() => normalizePresets(presets), [presets]);

  // Selection, "+" and Escape remove the focused swatch together with the
  // dropdown: return focus to the trigger. The custom color dialog then
  // restores focus to the trigger as well.
  const closeDropdown = () => {
    const trigger = rootRef.current?.firstElementChild;

    if (
      overlayRef.current?.contains(document.activeElement) &&
      trigger instanceof HTMLElement
    ) {
      trigger.focus();
    }

    setOpen(false);
  };

  const handleVisibleChange = (visible: boolean) => {
    if (visible) setOpen(true);
    else closeDropdown();
  };

  const handleSelect = (hex: string) => {
    closeDropdown();
    onChange(hex);
  };

  const handleAddClick = () => {
    closeDropdown();
    setCustomOpen(true);
  };

  const handleSave = (hex: string) => {
    setCustomOpen(false);
    onChange(hex);
  };

  const trigger = children ?? (
    <Button
      variant="outline"
      className={clsx({ [styles.trigger_empty]: !current })}
      disabled={disabled}
      aria-label={labels.trigger}
      icon={
        <span
          className={clsx(styles.dot, { [styles.dot_hidden]: !current })}
          style={current ? { backgroundColor: current } : undefined}
        />
      }
    />
  );

  return (
    <span ref={rootRef} className={styles.root}>
      <Dropdown
        trigger={["click"]}
        visible={isOpen}
        onVisibleChange={handleVisibleChange}
        preventAutoClose
        disabled={disabled}
        placement={placement}
        zIndex={zIndex}
        overlay={
          <div ref={overlayRef}>
            <Palette
              presets={normalizedPresets}
              value={current}
              columns={columns}
              labels={labels}
              onSelect={handleSelect}
              onAddClick={handleAddClick}
              onTabOut={closeDropdown}
            />
          </div>
        }
      >
        {trigger}
      </Dropdown>
      {isCustomOpen && (
        <CustomColorModal
          initialColor={current ?? normalizedPresets[0]?.value ?? "#000000"}
          labels={labels}
          onSave={handleSave}
          onClose={() => setCustomOpen(false)}
        />
      )}
    </span>
  );
};
