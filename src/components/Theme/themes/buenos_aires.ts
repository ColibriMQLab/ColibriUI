import Color from "../color";
import breakpoints from "../breakpoints";
import type { CheckboxVariant } from "../../Checkbox/index.props";
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
    hovered: {
      color: Color.WHITE,
      backgroundColor: Color.PRIMARY_BA_5,
      borderColor: Color.PRIMARY_BA_5,
    },
    focused: {
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
      color: Color.BG_3,
      backgroundColor: Color.BG_1,
      borderColor: Color.BG_1,
    },
  },
  secondary: {
    normal: {
      color: Color.WHITE,
      backgroundColor: Color.SECONDARY_BA_4,
      borderColor: Color.SECONDARY_BA_4,
    },
    hovered: {
      color: Color.WHITE,
      backgroundColor: Color.SECONDARY_BA_5,
      borderColor: Color.SECONDARY_BA_5,
    },
    focused: {
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
      color: Color.BG_3,
      backgroundColor: Color.BG_1,
      borderColor: Color.BG_1,
    },
  },
  clear: {
    normal: {
      color: Color.TRETIARY_BA_5,
      backgroundColor: Color.WHITE,
      borderColor: Color.WHITE,
    },
    hovered: {
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
      color: Color.BG_3,
      backgroundColor: Color.BG_1,
      borderColor: Color.BG_1,
    },
  },
};

export const InputThemeBA = {
  placeholder: {
    color: Color.BG_2,
  },
  primary: {
    normal: {
      borderColor: Color.BG_3,
    },
    hovered: {
      borderColor: Color.PRIMARY_3,
      boxShadow: `0px 0px 0px 2px ${Color.PRIMARY_2}`,
    },
    focused: {
      borderColor: Color.PRIMARY_4,
    },
    disabled: {
      color: Color.BG_3,
      backgroundColor: Color.BG_1,
      borderColor: Color.BG_3,
    },
    error: {
      normal: {
        backgroundColor: Color.TRETIARY_2,
        borderColor: Color.ALERT,
      },
      hovered: {
        backgroundColor: Color.WHITE,
        borderColor: Color.ALERT,
        boxShadow: `0px 0px 0px 2px ${Color.TRETIARY_2}`,
      },
      focused: {
        backgroundColor: Color.WHITE,
        borderColor: Color.ALERT,
      },
    },
  },
};

export const CheckboxThemeBA: CheckboxVariant = {
  primary: {
    normal: {
      backgroundColor: Color.PRIMARY_BA_4,
    },
    hovered: {
      backgroundColor: Color.PRIMARY_BA_4,
    },
    focused: {
      boxShadow: `0 0 0 2px ${Color.PRIMARY_BA_1}`,
    },
    checked: {
      backgroundColor: Color.PRIMARY_BA_4,
    },
    active: {
      backgroundColor: Color.PRIMARY_BA_4,
      borderColor: Color.PRIMARY_BA_4,
      boxShadow: Color.PRIMARY_BA_4,
    },
    disabled: {
      backgroundColor: Color.BG_1,
    },
  },
};

export const TypographyThemeBA = {
  alert: {
    color: Color.ALERT,
  },
  success: {
    color: Color.SUCCESS,
  },
  secondary: {
    color: Color.BG_3,
  },
};

export const SwitchThemeDefault = {
  circle: {
    backgroundColor: Color.WHITE,
  },
  state: {
    normal: {
      backgroundColor: Color.BG_2,
      borderColor: Color.BG_2,
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
  input: InputThemeBA,
  checkbox: CheckboxThemeBA,
  typography: TypographyThemeBA,
  switch: SwitchThemeDefault,
  palette: Color,
};
