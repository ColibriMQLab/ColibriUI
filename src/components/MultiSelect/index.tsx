import React, { useCallback, useId, useMemo, useState } from "react";
import clsx from "clsx";
import { Dropdown } from "../Dropdown";
import { InputRoot } from "../base/InputRoot";
import { FormField } from "../base/FormField";
import { Chevron, CrossFill } from "../Icons";
import { Chip } from "../Chip";
import styles from "./index.module.scss";
import { MenuOverlay } from "./components/MenuOverlay";
import { fromKey, toKey } from "./utils";
import type { GroupOptions, MultiSelectProps } from "./index.props";

type GroupOptionsWithSelected = GroupOptions & { selected: boolean };
type PreparedLabelProps = { label: string; key: string };

const getValue = (options: PreparedLabelProps[]): string =>
  options.map(({ label }) => label).join(", ");

export const MultiSelect: React.FC<MultiSelectProps> = ({
  className,
  groups,
  zIndex,
  fontSize,
  disabled,
  fullWidth = false,
  required,
  label,
  hint,
  style,
  hasError,
  size = "m",
  placeholder,
  name,
  value = [],
  type,
  onChange,
  "aria-label": ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const id = useId();
  const labelId = label ? `${id}-label` : undefined;
  const valueId = `${id}-value`;
  const hintId = hint ? `${id}-hint` : undefined;
  const internalSelectedKeys = useMemo(() => value.map(toKey), [value]);

  const preparedGroups = useMemo(
    () =>
      groups.map((group) => ({
        ...group,
        options: group.options.map(
          (option): GroupOptionsWithSelected => ({
            ...option,
            selected: internalSelectedKeys.includes(
              toKey({ group: group.value, option: option.value }),
            ),
          }),
        ),
      })),
    [groups, internalSelectedKeys],
  );

  const handleChange = useCallback(
    (key: string) => {
      const exists = value.some((v) => toKey(v) === key);
      const item = fromKey(key);
      const newValue = exists
        ? value.filter((v) => toKey(v) !== key)
        : [...value, item];
      onChange?.(newValue);
    },
    [onChange, value],
  );

  const preparedLabel = useMemo(
    () =>
      preparedGroups.flatMap(({ value: groupVal, options }) =>
        options

          .filter(({ selected }) => selected)
          .map(
            // eslint-disable-next-line @typescript-eslint/no-shadow
            ({ label, value: optVal }): PreparedLabelProps => ({
              label,
              key: toKey({ group: groupVal, option: optVal }),
            }),
          ),
      ),
    [preparedGroups],
  );

  return (
    <FormField
      className={clsx(
        styles["form-field"],
        { [styles["full-width"]]: Boolean(fullWidth) },
        className,
      )}
      required={required}
      label={label}
      labelId={labelId}
      hint={hint}
      hintId={hintId}
      hasError={hasError}
    >
      <Dropdown
        placement="bottom-start"
        preventOverflow
        onVisibleChange={setIsOpen}
        trigger={["click"]}
        zIndex={zIndex}
        fontSize={fontSize}
        disabled={disabled}
        overlay={
          <MenuOverlay groups={preparedGroups} onChange={handleChange} />
        }
        samewidth
      >
        <div
          aria-describedby={hintId}
          aria-disabled={disabled || undefined}
          aria-label={labelId ? undefined : ariaLabel}
          aria-labelledby={labelId ? `${labelId} ${valueId}` : undefined}
          tabIndex={disabled ? -1 : 0}
          role="button"
          style={{ width: fullWidth ? "100%" : "fit-content" }}
        >
          <InputRoot
            hasError={hasError}
            size={size}
            active={isOpen && Boolean(!disabled)}
            style={{ ...style, width: fullWidth ? "100%" : "" }}
            className={clsx(styles.root, {
              [styles["root_auto"]]: preparedLabel.length,
            })}
            endIcon={
              <Chevron
                className={clsx(styles.icon, {
                  [styles["icon_isOpen"]]: isOpen && Boolean(!disabled),
                })}
              />
            }
            disabled={Boolean(disabled)}
          >
            <div
              id={valueId}
              className={clsx(
                styles["base-input"],
                styles[type === "chip" ? "base-input-flex" : "base-input-text"],
              )}
            >
              {preparedLabel.length ? (
                type === "chip" ? (
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                  preparedLabel.map(({ label, key }) => (
                    <Chip
                      key={key}
                      size="s"
                      iconEnd={<CrossFill />}
                      data-ignore-click
                      onClickIcon={() => handleChange(key)}
                    >
                      {label}
                    </Chip>
                  ))
                ) : (
                  getValue(preparedLabel)
                )
              ) : (
                <span className={styles.placeholder}>{placeholder}</span>
              )}
            </div>
            <input
              type="hidden"
              name={name}
              tabIndex={-1}
              value={internalSelectedKeys.join(",") || ""}
            />
          </InputRoot>
        </div>
      </Dropdown>
    </FormField>
  );
};
