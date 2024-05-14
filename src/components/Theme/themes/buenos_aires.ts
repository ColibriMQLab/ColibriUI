import type { ButtonBase, ButtonVariant } from "../../Button/index.props";
import Color from "../color";
import breakpoints from "../breakpoints";

export const ButtonThemeBA: ButtonVariant & ButtonBase = {
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
  clear: {
    normal: {
      color: Color.GRAY_9,
      backgroundColor: Color.WHITE,
      borderColor: Color.WHITE,
    },
    hover: {
      color: Color.BLACK,
      backgroundColor: Color.NEUTRAL_2,
      borderColor: Color.NEUTRAL_2,
    },
    active: {
      color: Color.BLACK,
      backgroundColor: Color.NEUTRAL_2,
      borderColor: Color.NEUTRAL_2,
    },
    disabled: {
      color: Color.NEUTRAL_3,
      backgroundColor: Color.NEUTRAL_1,
      borderColor: Color.NEUTRAL_1,
    },
  },
};

export const TypographyThemeBA = {
  primary: Color.TYPOGRAPHY_PRIMARY,
  secondary: Color.TYPOGRAPHY_SECONDARY,
  alert: Color.TYPOGRAPHY_ALERT,
  success: Color.TYPOGRAPHY_SUCCESS,
  link: Color.TYPOGRAPHY_LINK,
};

export const THEME_BA = {
  breakpoints,
  button: ButtonThemeBA,
  typography: TypographyThemeBA,
};
