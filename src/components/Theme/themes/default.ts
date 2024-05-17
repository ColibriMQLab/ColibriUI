import Color from "../color";
import breakpoints from "../breakpoints";
import type { ButtonBase, ButtonVariant } from "../../Button/index.props";

export const ButtonThemeDefault: ButtonVariant & ButtonBase = {
  base: {
    color: Color.BLACK,
    borderRadius: "26px",
  },
  primary: {
    normal: {
      color: Color.WHITE,
      backgroundColor: Color.PRIMARY_4,
      borderColor: Color.PRIMARY_4,
    },
    hover: {
      color: Color.WHITE,
      backgroundColor: Color.PRIMARY_5,
      borderColor: Color.PRIMARY_5,
    },
    focus: {
      color: Color.WHITE,
      backgroundColor: Color.PRIMARY_5,
      borderColor: Color.PRIMARY_5,
    },
    active: {
      color: Color.WHITE,
      backgroundColor: Color.PRIMARY_5,
      borderColor: Color.PRIMARY_5,
    },
    disabled: {
      color: Color.PRIMARY_3,
      backgroundColor: Color.PRIMARY_2,
      borderColor: Color.PRIMARY_2,
    },
  },
  secondary: {
    normal: {
      color: Color.WHITE,
      backgroundColor: Color.SECONDARY_4,
      borderColor: Color.SECONDARY_4,
    },
    hover: {
      color: Color.WHITE,
      backgroundColor: Color.SECONDARY_5,
      borderColor: Color.SECONDARY_5,
    },
    focus: {
      color: Color.WHITE,
      backgroundColor: Color.SECONDARY_5,
      borderColor: Color.SECONDARY_5,
    },
    active: {
      color: Color.WHITE,
      backgroundColor: Color.SECONDARY_5,
      borderColor: Color.SECONDARY_5,
    },
    disabled: {
      color: Color.SECONDARY_3,
      backgroundColor: Color.SECONDARY_2,
      borderColor: Color.SECONDARY_2,
    },
  },
  clear: {
    normal: {
      color: Color.TRETIARY_5,
      backgroundColor: Color.WHITE,
      borderColor: Color.WHITE,
    },
    hover: {
      color: Color.TRETIARY_5,
      backgroundColor: Color.TRETIARY_2,
      borderColor: Color.TRETIARY_2,
    },
    active: {
      color: Color.TRETIARY_5,
      backgroundColor: Color.TRETIARY_2,
      borderColor: Color.TRETIARY_2,
    },
    disabled: {
      color: Color.TRETIARY_3,
      backgroundColor: Color.TRETIARY_1,
      borderColor: Color.TRETIARY_1,
    },
  },
};

export const TypographyThemeDefault = {
  secondary: {
    color: Color.TYPOGRAPHY_SECONDARY,
  },
  alert: {
    color: Color.TYPOGRAPHY_ALERT,
  },
  success: {
    color: Color.TYPOGRAPHY_SUCCESS,
  },
};

export const SwitchThemeDefault = {
  circle: {
    backgroundColor: Color.WHITE,
  },
  state: {
    normal: {
      backgroundColor: Color.BG_1,
      borderColor: Color.BG_1,
    },
    checked: {
      backgroundColor: Color.PRIMARY_5,
      borderColor: Color.PRIMARY_5,
    },
  },
};

export const THEME_DEFAULT = {
  breakpoints,
  button: ButtonThemeDefault,
  typography: TypographyThemeDefault,
  switch: SwitchThemeDefault,
  palette: Color,
};
