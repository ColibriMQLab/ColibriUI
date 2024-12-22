import React, { useRef } from "react";
import type { FC } from "react";

type OptionLabelProps = {
  time: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
};

const OptionLabel: FC<OptionLabelProps> = ({ time, onClick, onMouseEnter }) => {
  const ref = useRef<HTMLLIElement | null>(null);
  return (
    <span onClick={onClick} onMouseEnter={onMouseEnter} ref={ref}>
      {time}
    </span>
  );
};

export default OptionLabel;
