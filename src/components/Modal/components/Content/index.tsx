import { Wrapper } from "./styles";
import type { FC, ReactNode } from "react";

const Content: FC<{ children: ReactNode }> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Content;
