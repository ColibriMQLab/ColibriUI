import type { ButtonBase, ButtonVariant } from "../../Button/index.props";
import Color from "../color";
import breakpoints from "../breakpoints";

export const ButtonDefault: ButtonVariant | ButtonBase = {
  base: {
    color: Color.WHITE,
    borderRadius: '26px',
  },
  primary: {
    normal: {
      backgroundColor: Color.BLUE_9,
      borderColor: Color.BLUE_9,
    },
    hover: {
      backgroundColor: Color.BLUE_10,
      borderColor: Color.BLUE_10,
    },
    focus: {
      backgroundColor: Color.BLUE_10,
      borderColor: Color.BLUE_10,
    },
    active: {
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
