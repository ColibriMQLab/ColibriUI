import { css } from "@emotion/react";
import styled from "@emotion/styled";

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
  error?: boolean;
}>`
  background-color: ${({ theme }) => theme.palette.WHITE};
  block-size: 16px;
  border: 1px solid ${({ theme }) => theme.palette.BG_2};
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

  ${({ error }) => css`
    ${error &&
    css`
      border-color: red;
      box-shadow: 0 0 0 2px red;
    `}
  `}

  ${({ checked }) => css`
    ${checked &&
    css`
      background-color: rgb(255, 220, 130);
      border: 0;

      &::after {
        box-sizing: content-box;
        content: "";
        display: block;
        position: absolute;

        block-size: 8px;
        border-block-end: 2px solid rgb(45, 49, 55);
        border-inline-end: 2px solid rgb(45, 49, 55);
        inline-size: 4px;
        inset-block-start: 45%;
        inset-inline-start: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
      }
    `}
  `}
`;

export const Control = styled.input`
  inset-inline-start: -9999px;
  position: absolute;

  &:hover:not(:disabled) + ${FakeCheckbox} {
    border-color: ${({ theme }) => theme.palette.BG_3};
  }

  &:focus:not(:disabled) + ${FakeCheckbox} {
    box-shadow: 0 0 0 2px rgba(255, 220, 130, 0.4);
  }

  &:active:not(:disabled) + ${FakeCheckbox} {
    background-color: rgba(255, 220, 130, 0.4);
    border-color: rgba(255, 220, 130, 0.4);
    box-shadow: 0 0 0 2px rgba(255, 220, 130, 0.4);
  }

  &:disabled + ${FakeCheckbox} {
    z-index: 1;
    background-color: rgba(246, 246, 246, 0.8);
  }

  &:hover:not(:disabled) + ${FakeCheckbox} {
    background-color: rgb(254, 212, 102);
  }
`;
