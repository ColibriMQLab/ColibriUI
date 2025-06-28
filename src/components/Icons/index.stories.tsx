import React from "react";
import ArrowNext from "./ArrowNext";
import Cart from "./Cart";
import Check from "./Check";
import Chevron from "./Chevron";
import Close from "./Close";
import Cross from "./Cross";
import CrossFill from "./CrossFill";
import Edit from "./Edit";
import Exit from "./Exit";
import EyeOpen from "./EyeOpen";
import EyeClosed from "./EyeClosed";
import Help from "./Help";
import Info from "./Info";
import Minus from "./Minus";
import More from "./More";
import Plus from "./Plus";
import Setting from "./Setting";
import Shield from "./Shield";
import Trash from "./Trash";
import User from "./User";
import type { ReactNode } from "react";

const icons = {
  ArrowNext: <ArrowNext/>,
  Cart: <Cart />,
  Check: <Check />,
  Chevron: <Chevron />,
  Close: <Close />,
  Cross: <Cross />,
  CrossFill: <CrossFill />,
  Edit: <Edit />,
  Exit: <Exit />,
  EyeClosed: <EyeClosed />,
  EyeOpen: <EyeOpen />,
  Help: <Help />,
  Info: <Info />,
  Minus: <Minus />,
  More: <More />,
  Plus: <Plus />,
  Setting: <Setting />,
  Shield: <Shield/>,
  Trash: <Trash />,
  User: <User />,
};

export default {
  title: "UI/Icons",
  parameters: {
    layout: "centered",
  },
};

const renderIcons = (icons: { [key: string]: ReactNode }) => {
  const allIcons = [];
  for (const icon in icons) {
    allIcons.push(
      // @ts-expect-error error
      <div key={Math.random()}>
        <div style={{textAlign: 'center', fontSize: '40px', width: '100%'}}>{icons[icon]}</div>
        <div>{icon}</div>
      </div>,
    );
  }

  return allIcons.map((item) => item);
};

export const All = () => {
  return <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>{renderIcons(icons)}</div>;
};

export const Colored = () => {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', color: "#0066DC" }}>{renderIcons(icons)}</div>;
};
