import Typography from "../../../Typography";
import { Wrapper } from "./styles";
import type { CSSObject } from "@emotion/react";
import type { FC, ReactNode } from "react";

const Title: FC<{
  children: ReactNode;
  justifyContent?: CSSObject["justifyContent"];
}> = ({ children, justifyContent = "flex-start" }) => {
  return (
    <Typography tag="h3" size="h3">
      <Wrapper justifyContent={justifyContent}>{children}</Wrapper>
    </Typography>
  );
};

export default Title;
