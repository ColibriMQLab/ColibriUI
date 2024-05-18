import Color from "../color";
import breakpoints from "../breakpoints";
import type { CheckboxVariant } from "../../Checkbox/index.props";
import type { ButtonBase, ButtonVariant } from "../../Button/index.props";

export const ButtonThemeDefault: ButtonVariant & ButtonBase = {
  base: {
    borderRadius: "26px",
  },
  primary: {
    normal: {
      color: Color.WHITE,
      backgroundColor: Color.PRIMARY_4,
      borderColor: Color.PRIMARY_4,
    },
    hovered: {
      color: Color.WHITE,
      backgroundColor: Color.PRIMARY_5,
      borderColor: Color.PRIMARY_5,
    },
    focused: {
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
      color: Color.BG_3,
      backgroundColor: Color.BG_1,
      borderColor: Color.BG_1,
    },
  },
  secondary: {
    normal: {
      color: Color.WHITE,
      backgroundColor: Color.SECONDARY_4,
      borderColor: Color.SECONDARY_4,
    },
    hovered: {
      color: Color.WHITE,
      backgroundColor: Color.SECONDARY_5,
      borderColor: Color.SECONDARY_5,
    },
    focused: {
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
      color: Color.BG_3,
      backgroundColor: Color.BG_1,
      borderColor: Color.BG_1,
    },
  },
  clear: {
    normal: {
      color: Color.TRETIARY_5,
      backgroundColor: Color.WHITE,
      borderColor: Color.WHITE,
    },
    hovered: {
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
      color: Color.BG_3,
      backgroundColor: Color.BG_1,
      borderColor: Color.BG_1,
    },
  },
};

export const InputThemeDefault = {
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

export const CheckboxThemeDefault: CheckboxVariant = {
  primary: {
    normal: {
      backgroundColor: Color.PRIMARY_4,
    },
    hovered: {
      backgroundColor: Color.PRIMARY_4,
    },
    focused: {
      boxShadow: `0 0 0 2px ${Color.PRIMARY_1}`,
    },
    checked: {
      backgroundColor: Color.PRIMARY_4,
    },
    active: {
      backgroundColor: Color.PRIMARY_4,
      borderColor: Color.PRIMARY_4,
      boxShadow: Color.PRIMARY_4,
    },
    disabled: {
      backgroundColor: Color.BG_1,
    },
  },
};

export const TypographyThemeDefault = {
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
      backgroundColor: Color.PRIMARY_5,
      borderColor: Color.PRIMARY_5,
    },
  },
};

export const THEME_DEFAULT = {
  breakpoints,
  button: ButtonThemeDefault,
  input: InputThemeDefault,
  checkbox: CheckboxThemeDefault,
  typography: TypographyThemeDefault,
  switch: SwitchThemeDefault,
  palette: Color,
};
