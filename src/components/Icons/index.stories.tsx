import React from "react";
import { ArrowNext } from "./ArrowNext";
import { Book } from "./Book";
import { Bug } from "./Bug";
import { Cart } from "./Cart";
import { Check } from "./Check";
import { Chevron } from "./Chevron";
import { Close } from "./Close";
import { Comment } from "./Comment";
import { Console } from "./Console";
import { Cookie } from "./Cookie";
import { Copy } from "./Copy";
import { Copyright } from "./Copyright";
import { Cross } from "./Cross";
import { CrossFill } from "./CrossFill";
import { CurrencyGbp } from "./CurrencyGbp";
import { Edit } from "./Edit";
import { EyeClosed } from "./EyeClosed";
import { EyeOpen } from "./EyeOpen";
import { Github } from "./Github";
import { Help } from "./Help";
import { Info } from "./Info";
import { Minus } from "./Minus";
import { More } from "./More";
import { Pipette } from "./Pipette";
import { Plus } from "./Plus";
import { Setting } from "./Setting";
import { Shield } from "./Shield";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";
import { Trash } from "./Trash";
import { User } from "./User";
import type { ReactNode } from "react";

const icons = {
  ArrowNext: <ArrowNext />,
  Book: <Book />,
  Bug: <Bug />,
  Cart: <Cart />,
  Check: <Check />,
  Chevron: <Chevron />,
  Close: <Close />,
  Comment: <Comment />,
  Console: <Console />,
  Cookie: <Cookie />,
  Copy: <Copy />,
  Copyright: <Copyright />,
  Cross: <Cross />,
  CrossFill: <CrossFill />,
  CurrencyGbp: <CurrencyGbp />,
  Edit: <Edit />,
  EyeClosed: <EyeClosed />,
  EyeOpen: <EyeOpen />,
  Github: <Github />,
  Help: <Help />,
  Info: <Info />,
  Minus: <Minus />,
  More: <More />,
  Pipette: <Pipette />,
  Plus: <Plus />,
  Setting: <Setting />,
  Shield: <Shield />,
  SignIn: <SignIn />,
  SignOut: <SignOut />,
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
        <div style={{ textAlign: "center", fontSize: "2.5rem", width: "100%" }}>
          {icons[icon]}
        </div>
        <div>{icon}</div>
      </div>,
    );
  }

  return allIcons.map((item) => item);
};

export const All = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
      {renderIcons(icons)}
    </div>
  );
};

export const Colored = () => {
  return (
    <div
      style={{
        color: "var(--color-icon-primary)",
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-2)",
      }}
    >
      {renderIcons(icons)}
    </div>
  );
};
