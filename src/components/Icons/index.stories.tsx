import React from "react";
import Cart from "./Cart";
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
  Cart: <Cart />,
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
