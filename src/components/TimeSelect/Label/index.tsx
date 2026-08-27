import React from "react";
import type { FC } from "react";
import type { OptionLabelProps } from "./index.props";

export const OptionLabel: FC<OptionLabelProps> = ({
  time,
  onClick,
  onMouseEnter,
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <span onClick={onClick} onMouseEnter={onMouseEnter}>
    {time}
  </span>
);
