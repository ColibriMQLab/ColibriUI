import Color from "../color";
import breakpoints from "../breakpoints";
import type { ButtonBase, ButtonVariant } from "../../Button/index.props";

export const ButtonThemeBA: ButtonVariant & ButtonBase = {
  base: {
    color: Color.WHITE,
    borderRadius: "26px",
    border: "none",
  },
  primary: {
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
  secondary: {
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
      backgroundColor: Color.PURPLE_2,
      borderColor: Color.PURPLE_2,
    },
    active: {
      color: Color.BLACK,
      backgroundColor: Color.PURPLE_2,
      borderColor: Color.PURPLE_2,
    },
    disabled: {
      color: Color.PURPLE_3,
      backgroundColor: Color.PURPLE_1,
      borderColor: Color.PURPLE_1,
    },
  },
};

export const TypographyThemeBA = {
  primary: {
    color: Color.TYPOGRAPHY_PRIMARY,
  },
  secondary: {
    color: Color.TYPOGRAPHY_SECONDARY,
  },
  alert: {
    color: Color.TYPOGRAPHY_ALERT,
  },
  success: {
    color: Color.TYPOGRAPHY_SUCCESS,
  },
  link: {
    color: Color.TYPOGRAPHY_LINK,
  },
};

export const SwitchThemeDefault = {
  circle: {
    backgroundColor: Color.WHITE,
  },
  state: {
    normal: {
      backgroundColor: Color.GRAPHITE_6,
      borderColor: Color.GRAPHITE_6,
    },
    checked: {
      backgroundColor: Color.GRAPHITE_10,
      borderColor: Color.GRAPHITE_10,
    },
  },
};

export const THEME_BA = {
  breakpoints,
  button: ButtonThemeBA,
  typography: TypographyThemeBA,
  switch: SwitchThemeDefault,
  palette: Color,
};
