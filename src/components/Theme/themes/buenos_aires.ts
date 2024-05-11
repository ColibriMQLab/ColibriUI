import type { ButtonBase, ButtonVariant } from "../../Button/index.props";
import Color from "../color";
import breakpoints from "../breakpoints";

export const ButtonBA: ButtonVariant | ButtonBase = {
  base: {
    color: Color.BLACK,
    borderRadius: '26px',
    border: 'none',
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
      backgroundColor: Color.PURPLE_4,
      borderColor: Color.PURPLE_4,
    },
  },
};

export const THEME_BA = {
  breakpoints,
  button: ButtonBA,
};
