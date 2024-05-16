import React from "react";
import styled from "@emotion/styled";
import Typography from "../Typography";
import { Blue, Graphite, Gray, Purple, Common, Text, Neutral } from "./color";

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

const StyledName = styled(Typography)`
  word-break: break-all;
  mix-blend-mode: difference;
  color: white;
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
          return (
            <StyledColor key={i} style={{ backgroundColor: colors[name] }}>
              <StyledName tag="p" size="xs">
                {name}
              </StyledName>
            </StyledColor>
          );
        })}
      </StyledContainer>
    </>
  );
};

export const ThemeDefault = () => {
  return (
    <>
      {renderPalete(Common, "Common")}
      {renderPalete(Blue, "Blue")}
      {renderPalete(Neutral, "Neutral")}
      {renderPalete(Text, "Text")}
    </>
  );
};

export const ThemeBA = () => {
  return (
    <>
      {renderPalete(Common, "Common")}
      {renderPalete(Graphite, "Graphite")}
      {renderPalete(Gray, "Gray")}
      {renderPalete(Purple, "Purple")}
      {renderPalete(Text, "Text")}
    </>
  );
};
