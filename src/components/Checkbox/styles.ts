import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { CheckboxVariant } from "./index.props";

export const Label = styled.label`
  cursor: pointer;
  display: inline-flex;
  line-height: 18px;
  position: relative;
`;

export const Text = styled.span`
  font-size: 16px;
  margin-block-start: -1px;
  margin-inline-start: 8px;
`;

export const FakeCheckbox = styled.span<{
  checked?: boolean;
  isError?: boolean;
  variant: keyof CheckboxVariant;
}>`
  background-color: ${({ theme }) => theme.palette.WHITE};
  block-size: 16px;
  border: 1px solid ${({ theme }) => theme.palette.BG_3};
  border-radius: 4px;
  box-sizing: border-box;
  direction: ltr;
  display: block;
  flex-shrink: 0;
  inline-size: 16px;
  position: relative;
  transition:
    background 0.16s ease,
    border-color 0.16s ease,
    box-shadow 0.16s ease;

  ${({ isError }) => css`
    ${isError &&
    css`
      border-color: red;
      box-shadow: 0 0 0 2px red;
    `}
  `}

  ${({ checked, theme, variant }) => css`
    ${checked &&
    css`
      ${css(theme.checkbox[variant].checked)}
      border: 0;

      &::after {
        box-sizing: content-box;
        content: "";
        display: block;
        position: absolute;

        block-size: 8px;
        border-block-end: 2px solid ${css(theme.palette.BLACK)};
        border-inline-end: 2px solid ${css(theme.palette.BLACK)};
        inline-size: 4px;
        inset-block-start: 45%;
        inset-inline-start: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
      }
    `}

    ${checked &&
    variant === "primary" &&
    css`
      &::after {
        border-block-end: 2px solid ${css(theme.palette.WHITE)};
        border-inline-end: 2px solid ${css(theme.palette.WHITE)};
      }
    `}
  `}
`;

export const Control = styled.input<{ variant: keyof CheckboxVariant }>`
  inset-inline-start: -9999px;
  position: absolute;

  &:hover:not(:disabled) + ${FakeCheckbox} {
    border-color: ${({ theme }) => theme.palette.BG_3};
  }

  ${({ theme, variant }) => css`
    &:focus:not(:disabled) + ${FakeCheckbox} {
      ${css(theme.checkbox[variant].focused)}
    }

    &:hover:not(:disabled) + ${FakeCheckbox} {
      ${css(theme.checkbox[variant].hovered)}
    }

    &:active:not(:disabled) + ${FakeCheckbox} {
      ${css(theme.checkbox[variant].active)}
    }

    &:disabled + ${FakeCheckbox}::after {
      border-block-end: 2px solid ${css(theme.palette.BG_4)};
      border-inline-end: 2px solid ${css(theme.palette.BG_4)};
    }

    &:disabled + ${FakeCheckbox} {
      z-index: 1;
      ${css(theme.checkbox[variant].disabled)}
    }
  `}
`;
