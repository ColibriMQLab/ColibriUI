import type { CSSObject } from "@emotion/react";
import type { InputHTMLAttributes } from "react";

type SwitchStyle = {
  backgroundColor?: CSSObject["backgroundColor"];
  borderColor?: CSSObject["borderColor"];
};

export type SwitchStates = {
  circle: {
    backgroundColor?: CSSObject["backgroundColor"];
  };
  state: {
    normal: SwitchStyle;
    checked: SwitchStyle;
  };
};

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}
