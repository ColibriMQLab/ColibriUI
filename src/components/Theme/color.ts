export const Primary = {
  PRIMARY_1: "#E8F0FE",
  PRIMARY_2: "#B8D2FF",
  PRIMARY_3: "#73ABF8",
  PRIMARY_4: "#067AFF",
  PRIMARY_5: "#0066DC",
};

export const Secondary = {
  SECONDARY_1: "#fff1db",
  SECONDARY_2: "#ffdaa3",
  SECONDARY_3: "#ffca79",
  SECONDARY_4: "#f4b968",
  SECONDARY_5: "#ffab0f",
};

export const Tretiary = {
  TRETIARY_1: "#FFF5F0",
  TRETIARY_2: "#FFEAE2",
  TRETIARY_3: "#FFD8CA",
  TRETIARY_4: "#FFA384 ",
  TRETIARY_5: "#fc5200",
};

export const PrimaryBA = {
  PRIMARY_BA_1: "rgba(38, 49, 129, .07)",
  PRIMARY_BA_2: "rgba(38, 49, 129, .3)",
  PRIMARY_BA_3: "rgba(38, 49, 129, .4)",
  PRIMARY_BA_4: "rgba(38, 49, 129, .6)",
  PRIMARY_BA_5: "rgba(38, 49, 129, .8)",
};

export const SecondaryBA = {
  SECONDARY_BA_1: "#d9d9d9",
  SECONDARY_BA_2: "#bbb",
  SECONDARY_BA_3: "#636363",
  SECONDARY_BA_4: "#313131",
  SECONDARY_BA_5: "#1a1a1a",
};

export const TretiaryBA = {
  TRETIARY_BA_1: "#EDF1F5",
  TRETIARY_BA_2: "#d3dbe3",
  TRETIARY_BA_3: "#c5cfda",
  TRETIARY_BA_4: "#b1bcc8",
  TRETIARY_BA_5: "#87929d",
};

export const Common = {
  WHITE: "#fff",
  BLACK: "#000",
};

export const Backgrounds = {
  BG_1: "#e6e6e6",
  BG_2: "#dbdbdb",
  BG_3: "#b3b3b3",
  BG_4: "#999",
};

export const Text = {
  TYPOGRAPHY_SECONDARY: "#999",
  TYPOGRAPHY_ALERT: "#ff564e",
  TYPOGRAPHY_SUCCESS: "#28bc00",
};

export type ColorsTheme = {
  [key: string]: string;
};

export const Color = {
  ...Common,
  ...Text,
  ...Backgrounds,
  ...Primary,
  ...Secondary,
  ...Tretiary,
  ...PrimaryBA,
  ...SecondaryBA,
  ...TretiaryBA,
};

export default Color;
