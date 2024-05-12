import type { ButtonBase, ButtonVariant } from "../../Button/index.props";
import Color from "../color";
import breakpoints from "../breakpoints";

export const ButtonDefault: ButtonVariant & ButtonBase = {
  base: {
    color: Color.BLACK,
    borderRadius: "26px",
  },
  default: {
    normal: {
      backgroundColor: Color.NEUTRAL_2,
      borderColor: Color.NEUTRAL_2,
    },
    hover: {
      backgroundColor: Color.NEUTRAL_3,
      borderColor: Color.NEUTRAL_3,
    },
    focus: {
      backgroundColor: Color.NEUTRAL_3,
      borderColor: Color.NEUTRAL_3,
    },
    active: {
      backgroundColor: Color.NEUTRAL_3,
      borderColor: Color.NEUTRAL_3,
    },
    disabled: {
      color: Color.NEUTRAL_3,
      backgroundColor: Color.NEUTRAL_1,
      borderColor: Color.NEUTRAL_1,
    },
  },
  primary: {
    normal: {
      color: Color.WHITE,
      backgroundColor: Color.BLUE_9,
      borderColor: Color.BLUE_9,
    },
    hover: {
      color: Color.WHITE,
      backgroundColor: Color.BLUE_10,
      borderColor: Color.BLUE_10,
    },
    focus: {
      color: Color.WHITE,
      backgroundColor: Color.BLUE_10,
      borderColor: Color.BLUE_10,
    },
    active: {
      color: Color.WHITE,
      backgroundColor: Color.BLUE_10,
      borderColor: Color.BLUE_10,
    },
    disabled: {
      color: Color.BLUE_7,
      backgroundColor: Color.BLUE_4,
      borderColor: Color.BLUE_4,
    },
  },
};

export const THEME_DEFAULT = {
  breakpoints,
  button: ButtonDefault,
};
