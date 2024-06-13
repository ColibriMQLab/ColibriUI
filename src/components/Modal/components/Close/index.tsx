import { Close as CloseIcon } from "../../../Icons";
import { Root } from "./styles";
import type { FC } from "react";

const Close: FC<{ className?: string; onClick?: () => void }> = ({
  className,
  onClick,
}) => {
  return (
    <Root onClick={onClick} className={className}>
      <CloseIcon />
    </Root>
  );
};

export default Close;
