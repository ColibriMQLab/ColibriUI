import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Typography from "../Typography";
import {
  Primary,
  Secondary,
  Tretiary,
  PrimaryBA,
  SecondaryBA,
  TretiaryBA,
  Common,
  Backgrounds,
  Text,
} from "./color";

const meta = {
  title: "UI/Theme",
  parameters: {
    layout: "centered",
  },
};

export default meta;

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const StyledColor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  height: 100px;
  padding: 0 5px;
`;

const StyledTitle = styled(Typography)`
  margin: 20px 0;
`;

const StyledHeader = styled.div`
  width: 100%;
`;

const StyledName = styled(Typography)<{ colorName?: string }>`
  word-break: break-all;

  ${({ colorName }) => css`
    ${colorName === "BLACK" &&
    css`
      mix-blend-mode: difference;
      color: white;
    `}
  `}

  ${({ colorName }) => css`
    ${colorName === "SECONDARY_BA_4" &&
    css`
      color: white;
    `}
  `}

${({ colorName }) => css`
    ${colorName === "SECONDARY_BA_5" &&
    css`
      color: white;
    `}
  `}
`;

const renderPalete = (colors, title) => {
  return (
    <>
      <StyledHeader>
        <StyledTitle tag="h3" size="h3">
          {title}
        </StyledTitle>
      </StyledHeader>
      <StyledContainer>
        {Object.keys(colors).map((name, i) => {
          console.log(name);
          return (
            <StyledColor key={i} style={{ backgroundColor: colors[name] }}>
              <StyledName tag="p" size="xs" colorName={name}>
                {name}
              </StyledName>
            </StyledColor>
          );
        })}
      </StyledContainer>
    </>
  );
};

export const CommonPalette = () => {
  return (
    <>
      {renderPalete(Common, "Common")}
      {renderPalete(Text, "Text")}
      {renderPalete(Backgrounds, "Backgrounds")}
    </>
  );
};

export const ThemeDefault = () => {
  return (
    <>
      {renderPalete(Primary, "Primary")}
      {renderPalete(Secondary, "Secondary")}
      {renderPalete(Tretiary, "Tretiary")}
    </>
  );
};

export const ThemeBA = () => {
  return (
    <>
      {renderPalete(PrimaryBA, "Primary")}
      {renderPalete(SecondaryBA, "Secondary")}
      {renderPalete(TretiaryBA, "Tretiary")}
    </>
  );
};
