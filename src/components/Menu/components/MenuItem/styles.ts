import { css, CSSObject } from "@emotion/react";
import styled from "@emotion/styled";
import { MenuVariant } from "../../index.props";

export const Item = styled("li", {
  shouldForwardProp: (prop) => !["isSelected"].includes(prop),
})<{ isSelected?: boolean; variant: keyof MenuVariant; disabled?: boolean; }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  list-style: none;
  padding: 8px 6px;

  ${({ theme, variant, disabled, isSelected }) => css`
    ${css(theme.menu[variant].normal)}

    &:hover {
      ${css(theme.menu[variant].hovered)}
    }

    &:focus,
    &:focus-within {
      ${css(theme.menu[variant].focused)};
    }

    ${isSelected &&
      css`
        ${css(theme.menu[variant].selected)}
      `}

    ${disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;
      ${css(theme.menu[variant].disabled)}
    `}
  `}

  & > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`;
