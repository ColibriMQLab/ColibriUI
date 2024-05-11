import styled from "@emotion/styled";
import type { CSSObject } from "@emotion/react";
import { css } from "@emotion/react";
import type { ReactNode } from "react";
import type { ButtonVariant, IButtonProps } from "./index.props";

export const StyledButton = styled.button<{
  fullWidth?: boolean;
  variant: keyof ButtonVariant;
  icon?: ReactNode;
  size?: IButtonProps["size"];
}>`
  padding: 10px 12px;
  box-sizing: border-box;
  border: 1px solid;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 26px;
  cursor: pointer;
  gap: 8px;
  flex-shrink: 0;

  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;

  ${({ size }) =>
    size === "s" &&
    css`
      font-size: 16px;
      line-height: 20px;
      height: 32px;
    `};

  ${({ size }) =>
    size === "m" &&
    css`
      font-size: 18px;
      line-height: 24px;
      height: 36px;
    `};

  ${({ size }) =>
    size === "l" &&
    css`
      font-size: 20px;
      line-height: 26px;
      height: 42px;
    `};

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
    }

    ${disabled &&
    css`
      opacity: 0.7;
      cursor: not-allowed;
      pointer-events: none;
    `}
  `}

  ${({ icon, size }) => css`
    ${icon &&
    css`
      padding: 0px;
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
