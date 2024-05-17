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
      color: Color.WHITE,
      backgroundColor: Color.PRIMARY_BA_4,
      borderColor: Color.PRIMARY_BA_4,
    },
    hover: {
      color: Color.WHITE,
      backgroundColor: Color.PRIMARY_BA_5,
      borderColor: Color.PRIMARY_BA_5,
    },
    focus: {
      color: Color.WHITE,
      backgroundColor: Color.PRIMARY_BA_5,
      borderColor: Color.PRIMARY_BA_5,
    },
    active: {
      color: Color.WHITE,
      backgroundColor: Color.PRIMARY_BA_5,
      borderColor: Color.PRIMARY_BA_5,
    },
    disabled: {
      color: Color.PRIMARY_BA_3,
      backgroundColor: Color.PRIMARY_BA_2,
      borderColor: Color.PRIMARY_BA_2,
    },
  },
  secondary: {
    normal: {
      color: Color.WHITE,
      backgroundColor: Color.SECONDARY_BA_4,
      borderColor: Color.SECONDARY_BA_4,
    },
    hover: {
      color: Color.WHITE,
      backgroundColor: Color.SECONDARY_BA_5,
      borderColor: Color.SECONDARY_BA_5,
    },
    focus: {
      color: Color.WHITE,
      backgroundColor: Color.SECONDARY_BA_5,
      borderColor: Color.SECONDARY_BA_5,
    },
    active: {
      color: Color.WHITE,
      backgroundColor: Color.SECONDARY_BA_5,
      borderColor: Color.SECONDARY_BA_5,
    },
    disabled: {
      color: Color.SECONDARY_BA_3,
      backgroundColor: Color.SECONDARY_BA_2,
      borderColor: Color.SECONDARY_BA_2,
    },
  },
  clear: {
    normal: {
      color: Color.TRETIARY_BA_5,
      backgroundColor: Color.WHITE,
      borderColor: Color.WHITE,
    },
    hover: {
      color: Color.TRETIARY_BA_5,
      backgroundColor: Color.TRETIARY_BA_2,
      borderColor: Color.TRETIARY_BA_2,
    },
    active: {
      color: Color.TRETIARY_BA_5,
      backgroundColor: Color.TRETIARY_BA_2,
      borderColor: Color.TRETIARY_BA_2,
    },
    disabled: {
      color: Color.TRETIARY_BA_3,
      backgroundColor: Color.TRETIARY_BA_1,
      borderColor: Color.TRETIARY_BA_1,
    },
  },
};

export const TypographyThemeBA = {
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
      backgroundColor: Color.PRIMARY_BA_5,
      borderColor: Color.PRIMARY_BA_5,
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
