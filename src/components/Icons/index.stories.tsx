import React from "react";
import styled from "@emotion/styled";
import Close from "./Close";
import EyeOpen from "./EyeOpen";
import EyeClosed from "./EyeClosed";
import Help from "./Help";
import Info from "./Info";
import More from "./More";
import User from "./User";
import type { ReactNode } from "react";

const icons = {
  Close: <Close />,
  Info: <Info />,
  EyeOpen: <EyeOpen />,
  EyeClosed: <EyeClosed />,
  More: <More />,
  User: <User />,
  Help: <Help />,
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

const Template = () => {
  return <Wrapper>{renderIcons(icons)}</Wrapper>;
};

export const All = Template.bind({});
