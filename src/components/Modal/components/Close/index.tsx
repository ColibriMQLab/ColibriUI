import type { FC } from "react";
import { Root } from "./styles";

const Close: FC<{ onClick?: () => void }> = ({
  onClick,
}) => {
  return (
    <Root onClick={onClick} />
  );
};

export default Close;
