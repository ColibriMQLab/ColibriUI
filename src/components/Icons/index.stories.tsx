import React from "react";
import styled from "@emotion/styled";
import Chevron from "./Chevron";
import Close from "./Close";
import EyeOpen from "./EyeOpen";
import EyeClosed from "./EyeClosed";
import Help from "./Help";
import Info from "./Info";
import Minus from "./Minus";
import More from "./More";
import Plus from "./Plus";
import Trash from "./Trash";
import User from "./User";
import type { ReactNode } from "react";

const icons = {
  Chevron: <Chevron />,
  Close: <Close />,
  EyeClosed: <EyeClosed />,
  EyeOpen: <EyeOpen />,
  Help: <Help />,
  Info: <Info />,
  Minus: <Minus />,
  More: <More />,
  Plus: <Plus />,
  Trash: <Trash />,
  User: <User />,
};

export default {
  title: "UI/Icons",
};

const Wrapper = styled.div`
  display: flex;
  flexwrap: wrap;
  gap: 10px;
`;

const Item = styled.div`
  width: 100%;
  font-size: 40px;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 18px;
`;

const renderIcons = (icons: { [key: string]: ReactNode }) => {
  const allIcons = [];
  for (const icon in icons) {
    allIcons.push(
      // @ts-expect-error error
      <div key={Math.random()}>
        <Item>{icons[icon]}</Item>
        <Icon>{icon}</Icon>
      </div>,
    );
  }

  return allIcons.map((item) => item);
};

export const All = () => {
  return <Wrapper>{renderIcons(icons)}</Wrapper>;
};

export const Colored = () => {
  return <Wrapper style={{ color: "#0066DC" }}>{renderIcons(icons)}</Wrapper>;
};
