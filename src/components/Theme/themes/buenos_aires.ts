import type { ButtonBase, ButtonVariant } from "../../Button/index.props";
import Color from "../color";
import breakpoints from "../breakpoints";

export const ButtonBA: ButtonVariant & ButtonBase = {
  base: {
    color: Color.BLACK,
    borderRadius: "26px",
    border: "none",
  },
  primary: {
    normal: {
      backgroundColor: Color.PURPLE_9,
      borderColor: Color.PURPLE_9,
    },
    hover: {
      backgroundColor: Color.PURPLE_10,
      borderColor: Color.PURPLE_10,
    },
    focus: {
      backgroundColor: Color.PURPLE_10,
      borderColor: Color.PURPLE_10,
    },
    active: {
      backgroundColor: Color.PURPLE_10,
      borderColor: Color.PURPLE_10,
    },
    disabled: {
      color: Color.PURPLE_10,
      backgroundColor: Color.PURPLE_8,
      borderColor: Color.PURPLE_8,
    },
  },
};

export const THEME_BA = {
  breakpoints,
  button: ButtonBA,
};
