import Color from "./color";

type Styles = {
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  boxShadow?: string;
  borderWidth?: string;
  border?: string;
};

type ButtonState = {
  normal?: Styles;
  hover?: Styles;
  focus?: Styles;
  active?: Styles;
  disabled?: Styles;
};

export type ButtonTheme = {
  default: ButtonState;
};

const button: ButtonTheme = {
  default: {
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

export default button;
