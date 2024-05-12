import type { ButtonBase, ButtonVariant } from "../../Button/index.props";
import Color from "../color";
import breakpoints from "../breakpoints";

export const ButtonBA: ButtonVariant & ButtonBase = {
  base: {
    color: Color.WHITE,
    borderRadius: "26px",
    border: "none",
  },
  default: {
    normal: {
      backgroundColor: Color.GRAPHITE_9,
      borderColor: Color.GRAPHITE_9,
    },
    hover: {
      backgroundColor: Color.GRAPHITE_10,
      borderColor: Color.GRAPHITE_10,
    },
    focus: {
      backgroundColor: Color.GRAPHITE_10,
      borderColor: Color.GRAPHITE_10,
    },
    active: {
      backgroundColor: Color.GRAPHITE_10,
      borderColor: Color.GRAPHITE_10,
    },
    disabled: {
      color: Color.GRAPHITE_7,
      backgroundColor: Color.GRAPHITE_5,
      borderColor: Color.GRAPHITE_5,
    },
  },
  primary: {
    normal: {
      color: Color.BLACK,
      backgroundColor: Color.PURPLE_2,
      borderColor: Color.PURPLE_2,
    },
    hover: {
      color: Color.BLACK,
      backgroundColor: Color.PURPLE_3,
      borderColor: Color.PURPLE_3,
    },
    focus: {
      color: Color.BLACK,
      backgroundColor: Color.PURPLE_3,
      borderColor: Color.PURPLE_3,
    },
    active: {
      color: Color.BLACK,
      backgroundColor: Color.PURPLE_3,
      borderColor: Color.PURPLE_3,
    },
    disabled: {
      color: Color.PURPLE_3,
      backgroundColor: Color.PURPLE_1,
      borderColor: Color.PURPLE_1,
    },
  },
};

export const THEME_BA = {
  breakpoints,
  button: ButtonBA,
};
