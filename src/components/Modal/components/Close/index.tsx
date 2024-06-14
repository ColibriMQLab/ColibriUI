import { Root } from "./styles";
import type { FC } from "react";

const Close: FC<{ onClick?: () => void }> = ({ onClick }) => {
  return <Root onClick={onClick} />;
};

export default Close;
