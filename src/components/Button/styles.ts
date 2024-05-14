import styled from "@emotion/styled";
import type { CSSObject } from "@emotion/react";
import { css } from "@emotion/react";
import type { ReactNode } from "react";
import type { ButtonVariant, IButtonProps } from "./index.props";

const sizeS = css`
  height: 32px;
  font-size: 13px;
  line-height: 32px;
`;

const sizeM = css`
  height: 36px;
  font-size: 15px;
  line-height: 36px;
`;

const sizeL = css`
  height: 42px;
  font-size: 18px;
  line-height: 42px;
`;

export const StyledButton = styled.button<{
  fullWidth?: boolean;
  variant: keyof ButtonVariant;
  icon?: ReactNode;
  size?: IButtonProps["size"];
}>`
  padding: 0 12px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 8px;
  flex-shrink: 0;
  border: 1px solid;
  font-style: normal;
  font-weight: 400;
  height: 36px;
  font-size: 15px;
  line-height: 36px;
  transition: transform 0.1s ease-out;
  color 0.15s linear;
  transform: scale(1);

  ${({ theme }) => css`
    ${css(theme.button.base as CSSObject)}
  `}

  ${({ size }) => size === "s" && sizeS}
  ${({ size }) => size === "m" && sizeM}
  ${({ size }) => size === "l" && sizeL}

  ${({ theme, variant, fullWidth, disabled }) => css`
    ${fullWidth &&
    css`
      width: 100%;
    `}

    ${css(theme.button[variant].normal as CSSObject)}

    &:hover {
      ${css(theme.button[variant].hover as CSSObject)}
    }

    &:active {
      ${css(theme.button[variant].active as CSSObject)}
      transition: none;
      transform: scale(0.96);
    }

    ${disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
      ${css(theme.button[variant].disabled as CSSObject)}
    `}
  `}

  ${({ icon, size }) => css`
    ${icon &&
    css`
      padding: 0;
      margin: 0;
      border-radius: 50%;
      width: 36px;
      ${size === "s" && "width: 32px"};
      ${size === "m" && "width: 36px"};
      ${size === "l" && "width: 42px"};
    `}
  `}
`;

export const StyledIcon = styled.span`
  display: flex;
`;
