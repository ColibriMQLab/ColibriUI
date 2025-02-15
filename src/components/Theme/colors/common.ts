export const Common = {
  WHITE: "#FFF",
  BLACK: "#000",
};

export const Backgrounds = {
  BG_1: "#ECEEF2",
  BG_2: "#E4E6EA",
  BG_3: "#D6D9E0",
  BG_4: "#C9CDD6",
  BG_5: "#BCC1CC",
};

export const Accents = {
  ALERT: "#FF564E",
  ALERT_HOVER: "#e72d24",
  ALERT_ACTIVE: "#af2d26",
  ALERT_LIGHT: "#ffeeed",
  SUCCESS: "#4AC99B",
  SUCCESS_HOVER: "#42b48b",
  SUCCESS_ACTIVE: "#3ba07c",
  SUCCESS_LIGHT: "#ecf9f5",
};

export const Color = {
  ...Common,
  ...Accents,
  ...Backgrounds,
};

export default Color;
