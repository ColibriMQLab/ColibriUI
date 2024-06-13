import styled from "@emotion/styled";
import type { CSSObject } from "@emotion/styled";

export const Wrapper = styled("div", {
  shouldForwardProp: (prop) => !["justifyContent"].includes(prop),
})<{
  justifyContent: CSSObject["justifyContent"];
}>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};

  padding: 16px;
`;
