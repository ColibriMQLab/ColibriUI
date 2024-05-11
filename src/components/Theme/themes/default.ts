import type { ButtonVariant } from "../../Button/index.props";
import Color from "../color";
import breakpoints from "../breakpoints";

export const ButtonDefault: ButtonVariant = {
  primary: {
    normal: {
      color: Color.WHITE,
      backgroundColor: Color.BLUE_12,
      borderColor: Color.BLUE_12,
    },
    hover: {
      color: Color.WHITE,
      backgroundColor: Color.BLUE_11,
      borderColor: Color.BLUE_11,
    },
    focus: {
      color: Color.WHITE,
      backgroundColor: Color.BLUE_11,
      borderColor: Color.BLUE_11,
    },
    active: {
      color: Color.WHITE,
      backgroundColor: Color.BLUE_10,
      borderColor: Color.BLUE_10,
    },
    disabled: {
      color: Color.GRAY_7,
      backgroundColor: Color.GRAY_4,
    },
  },
};

export const THEME_DEFAULT = {
  breakpoints,
  button: ButtonDefault,
};
