import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Root = styled.div<{ fullWidth?: boolean }>`
  background-color: ${({ theme }) => theme.palette.WHITE};
  border-radius: 4px;
  box-sizing: border-box;
  display: inline-block;
  font-size: 16px;
  max-block-size: 40px;
  min-block-size: 40px;
  min-inline-size: 96px;
  overflow: hidden;
  position: relative;

  ${({ fullWidth }) => css`
    ${fullWidth &&
    css`
      inline-size: 100%;
    `}
  `}
`;

export const Control = styled.div<{ fullWidth?: boolean }>`
  align-items: center;
  block-size: 38px;
  display: flex;
  justify-content: space-between;
  gap: 4px;

  ${({ fullWidth }) => css`
    ${fullWidth &&
    css`
      inline-size: 100%;
    `}
  `}
`;

export const Value = styled.div`
  font-weight: 500;
  font-size: 18px;
  inline-size: 24px;
  user-select: none;
  text-align: center;
`;
