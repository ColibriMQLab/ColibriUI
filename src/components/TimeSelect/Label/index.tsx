import React, { useRef } from "react";
import type { FC } from "react";

type OptionLabelProps = {
  time: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
};

const OptionLabel: FC<OptionLabelProps> = ({ time, onClick, onMouseEnter }) => {
  const ref = useRef<null | HTMLLIElement>(null);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <span onClick={onClick} onMouseEnter={onMouseEnter} ref={ref}>
      {time}
    </span>
  );
};

export default OptionLabel;
