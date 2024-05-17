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

export const BrandDefault = {
  BRAND_DEFAULT_1: "#F393D2",
  BRAND_DEFAULT_2: "#4BDCF8",
  BRAND_DEFAULT_3: "#D5D500",
};

export const BrandBA = {
  BRAND_BA_1: "#B54141",
  BRAND_BA_2: "#fffbe9",
  BRAND_BA_3: "#D5D500",
};

export const Common = {
  WHITE: "#fff",
  BLACK: "#000",
};

export const Backgrounds = {
  BG_1: "#f2f2f2",
  BG_2: "#e6e6e6",
  BG_3: "#dbdbdb",
  BG_4: "#b3b3b3",
  BG_5: "#999",
};

export const Accents = {
  ALERT: "#ff564e",
  SUCCESS: "#28bc00",
};

export type ColorsTheme = {
  [key: string]: string;
};

export const Color = {
  ...Common,
  ...Accents,
  ...BrandDefault,
  ...BrandBA,
  ...Backgrounds,
  ...Primary,
  ...Secondary,
  ...Tretiary,
  ...PrimaryBA,
  ...SecondaryBA,
  ...TretiaryBA,
};

export default Color;
