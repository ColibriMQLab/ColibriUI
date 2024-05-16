import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const BaseContainer = styled.div<{ disabled: boolean }>`
  position: relative;

  display: inline-flex;

  padding: 6px;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.7;
      pointer-events: none;
    `}
`;

export const BaseSwitchContainer = styled.div`
  width: 40px;
  height: 22px;

  position: relative;
  box-sizing: border-box;

  border-width: 1px;
  border-style: solid;
  border-radius: 17px;

  border-color: ${({ theme }) => theme.switch.state.normal.borderColor};
  background: ${({ theme }) => theme.switch.state.normal.backgroundColor};
`;

export const BaseSwitch = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;

  position: absolute;

  top: 2px;
  left: 2px;

  transition: transform 150ms;

  ${({ theme }) => css`
    background: ${theme.switch.circle.backgroundColor};
  `}
`;

export const BaseInput = styled.input`
  position: absolute;
  z-index: 1;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;

  cursor: pointer;

  opacity: 0;

  margin: 0;
  border: none;
  outline: none;
  padding: 0;

  &:checked + ${BaseSwitchContainer} {
    border-color: ${({ theme }) => theme.switch.state.checked.borderColor};
    background: ${({ theme }) => theme.switch.state.checked.backgroundColor};

    ${BaseSwitch} {
      transform: translateX(18px);
    }
  }
`;
