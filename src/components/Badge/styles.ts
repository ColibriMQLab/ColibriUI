import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Root = styled.span<{
  direction?: "right" | "left";
  invisible?: boolean;
}>`
  position: absolute;
  z-index: 1;
  user-select: none;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;

  box-sizing: border-box;
  min-width: 20px;
  height: 20px;
  padding: 0 4px;

  font-size: 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.BRAND_DEFAULT_1};
  color: ${({ theme }) => theme.palette.WHITE};

  ${({ direction }) => css`
    ${direction === "right" &&
    css`
      top: 0;
      right: 0;

      transform: scale(1) translate(90%, -50%);
    `}

    ${direction === "left" &&
    css`
      top: 0;
      left: 0;

      transform: scale(1) translate(-90%, -50%);
    `}
  `}

  ${({ invisible }) => css`
    ${invisible &&
    css`
      transform: scale(0) translate(50%, -50%);
    `}
  `}
`;
