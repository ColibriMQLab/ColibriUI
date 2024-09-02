export const Primary = {
  PRIMARY_DEFAULT_1: "#E8F0FE",
  PRIMARY_DEFAULT_2: "#B8D2FF",
  PRIMARY_DEFAULT_3: "#73ABF8",
  PRIMARY_DEFAULT_4: "#067AFF",
  PRIMARY_DEFAULT_5: "#0066DC",
};

export const Secondary = {
  SECONDARY_DEFAULT_1: "#fff1db",
  SECONDARY_DEFAULT_2: "#ffdaa3",
  SECONDARY_DEFAULT_3: "#ffca79",
  SECONDARY_DEFAULT_4: "#f4b968",
  SECONDARY_DEFAULT_5: "#ffab0f",
};

export const Tretiary = {
  TRETIARY_DEFAULT_1: "#FFF5F0",
  TRETIARY_DEFAULT_2: "#FFEAE2",
  TRETIARY_DEFAULT_3: "#FFD8CA",
  TRETIARY_DEFAULT_4: "#FFA384 ",
  TRETIARY_DEFAULT_5: "#fc5200",
};

export const Brand = {
  BRAND_DEFAULT_1: "#F393D2",
  BRAND_DEFAULT_2: "#4BDCF8",
  BRAND_DEFAULT_3: "#D5D500",
};

export const Color = {
  ...Brand,
  ...Primary,
  ...Secondary,
  ...Tretiary,
};

export default Color;
