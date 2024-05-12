import React from "react";
import styled from "@emotion/styled";
import type { ReactNode } from "react";
import AddWidget from "./AddWidget";
import Alert from "./Alert";
import Arrow from "./Arrow";
import Burger from "./Burger";
import Check from "./Check";
import CheckBoxDefault from "./CheckBoxDefault";
import CheckBoxChecked from "./CheckBoxChecked";
import Chevron from "./Chevron";
import Close from "./Close";
import CloseRound from "./CloseRound";
import Edit from "./Edit";
import Error from "./Error";
import EyeOpen from "./EyeOpen";
import EyeClosed from "./EyeClosed";
import Globe from "./Globe";
import Help from "./Help";
import Info from "./Info";
import Location from "./Location";
import Lock from "./Lock";
import Mir from "./Mir";
import More from "./More";
import Notes from "./Notes";
import Setting from "./Setting";
import Share from "./Share";
import SignOut from "./SignOut";
import Telegram from "./Telegram";
import User from "./User";

const icons = {
  AddWidget: <AddWidget />,
  Alert: <Alert />,
  Arrow: <Arrow />,
  Burger: <Burger />,
  Check: <Check />,
  CheckBoxDefault: <CheckBoxDefault />,
  CheckBoxChecked: <CheckBoxChecked />,
  Chevron: <Chevron />,
  Close: <Close />,
  CloseRound: <CloseRound />,
  Info: <Info />,
  Edit: <Edit />,
  Error: <Error />,
  EyeOpen: <EyeOpen />,
  EyeClosed: <EyeClosed />,
  Setting: <Setting />,
  Share: <Share />,
  SignOut: <SignOut />,
  Globe: <Globe />,
  Location: <Location />,
  Lock: <Lock />,
  Mir: <Mir />,
  More: <More />,
  Notes: <Notes />,
  User: <User />,
  Help: <Help />,
  Telegram: <Telegram />,
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
