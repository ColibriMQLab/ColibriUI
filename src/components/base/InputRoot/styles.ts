import { css, CSSObject } from "@emotion/react";
import styled from "@emotion/styled";
import { InputSize, InputVariant } from "./index.props";

const sizeS = css`
  height: 32px;
`;

const sizeM = css`
  height: 36px;
`;

const sizeL = css`
  height: 42px;
`;

export const BaseInputRoot = styled.div<{
  disabled: boolean;
  isError?: number;
  size?: InputSize;
  variant: keyof InputVariant;
}>`
  background-color: ${({ theme }) => theme.palette.WHITE};
  color: ${({ theme }) => theme.palette.BLACK};
  position: relative;
  box-sizing: border-box;
  overflow: hidden;

  display: inline-flex;
  align-items: center;
  gap: 8px;

  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  padding: 5px 10px;

  ${({ size }) => size === "s" && sizeS}
  ${({ size }) => size === "m" && sizeM}
  ${({ size }) => size === "l" && sizeL}

  ${({ theme, variant, disabled }) => css`
    ${css(theme.input[variant].normal)}

    &:hover {
      ${css(theme.input[variant].hovered)}
    }

    &:active {
      ${css(theme.input[variant].active)}
    }

    &:focus,
    &:focus-within {
      ${css(theme.input[variant].focused)}
    }

    ${disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
      ${css(theme.input[variant].disabled)}
    `}
  `}

  ${({ isError, theme, variant }) =>
      isError &&
      css`
        ${css(theme.input[variant].error?.normal)}
    
        &:hover {
          ${css(theme.input[variant].error?.hovered)}
        }
    
        &:focus,
        &:focus-within {
          ${css(theme.input[variant].error?.focused)}
        }
      `}

`;

export const BaseInput = styled.div`
  margin: 7px 0;
  background: transparent;
  border: none;
  outline: none;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;

  ::placeholder {
    ${({ theme }) => css(theme.input.placeholder)};
  }
`;

export const BasePlaceholder = styled.span`
  user-select: none;
  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;

  max-width: 100%;
  display: block;

  ${({ theme }) => css(theme.input.placeholder)};
`;

export const BaseIcon = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 16px;
  color: inherit;
`;

export const BaseDisableWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;

  cursor: not-allowed;
`;



