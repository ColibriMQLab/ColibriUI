import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const PopperContainer = styled.div`
  padding-top: 2px;
  padding-bottom: 2px;
`;

export const OverlayContainer = styled.div`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  overflow: hidden;

  ${({ theme }) => css`
    border-color: ${theme.palette.BG_2};
    background-color: ${theme.palette.WHITE};
  `}
`;
