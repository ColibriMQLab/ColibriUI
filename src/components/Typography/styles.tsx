import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  type TypographyFontWeight,
  type TypographySize,
  type TypographyVariant,
} from "./index.props";

const sizeXS = css`
  font-size: 12px;
  line-height: 16px;
`;

const sizeS = css`
  font-size: 14px;
  line-height: 18px;
`;

const sizeM = css`
  font-size: 16px;
  line-height: 22px;
`;

const sizeL = css`
  font-size: 18px;
  line-height: 28px;
`;

const sizeH1 = css`
  font-size: 40px;
  line-height: 56px;
`;

const sizeH2 = css`
  font-size: 32px;
  line-height: 40px;
`;

const sizeH3 = css`
  font-size: 24px;
  line-height: 32px;
`;

const sizeH4 = css`
  font-size: 20px;
  line-height: 28px;
`;

const sizeH5 = css`
  font-size: 16px;
  line-height: 24px;
`;

const sizeH6 = css`
  font-size: 12px;
  line-height: 16px;
`;

const fontWeightNormal = css`
  font-weight: 400;
`;

const fontWeightMedium = css`
  font-weight: 500;
`;

const fontWeightBold = css`
  font-weight: 700;
`;

export const BaseTypography = styled.span<{
  variant: keyof TypographyVariant;
  size?: TypographySize;
  fontWeight?: TypographyFontWeight;
}>`
  color: ${({ theme }) => theme.palette.BLACK};

  ${({ size }) => size === "xs" && sizeXS}
  ${({ size }) => size === "s" && sizeS}
  ${({ size }) => size === "m" && sizeM}
  ${({ size }) => size === "l" && sizeL}
  ${({ size }) => size === "h1" && sizeH1}
  ${({ size }) => size === "h2" && sizeH2}
  ${({ size }) => size === "h3" && sizeH3}
  ${({ size }) => size === "h4" && sizeH4}
  ${({ size }) => size === "h5" && sizeH5}
  ${({ size }) => size === "h6" && sizeH6}

  ${({ fontWeight }) => fontWeight === "normal" && fontWeightNormal}
  ${({ fontWeight }) => fontWeight === "medium" && fontWeightMedium}
  ${({ fontWeight }) => fontWeight === "bold" && fontWeightBold}

  ${({ theme, variant }) => css`
    ${css(theme.typography[variant])}
  `}
`;
