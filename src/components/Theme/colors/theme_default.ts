export const Primary = {
  PRIMARY_DEFAULT_1: "#E8F0FE",
  PRIMARY_DEFAULT_2: "#B8D2FF",
  PRIMARY_DEFAULT_3: "#73ABF8",
  PRIMARY_DEFAULT_4: "#067AFF",
  PRIMARY_DEFAULT_5: "#0066DC",
};

export const Secondary = {
  SECONDARY_DEFAULT_1: "#FFF1DB",
  SECONDARY_DEFAULT_2: "#FFDAA3",
  SECONDARY_DEFAULT_3: "#FFCA79",
  SECONDARY_DEFAULT_4: "#F4B968",
  SECONDARY_DEFAULT_5: "#FFAB0F",
};

export const Tretiary = {
  TRETIARY_DEFAULT_1: "#FFF5F0",
  TRETIARY_DEFAULT_2: "#FFEAE2",
  TRETIARY_DEFAULT_3: "#FFD8CA",
  TRETIARY_DEFAULT_4: "#FFA384",
  TRETIARY_DEFAULT_5: "#FC5200",
};

export const Brand = {
  BRAND_DEFAULT_1: "#f6aadc",
  BRAND_DEFAULT_2: "#F393D2",
  BRAND_DEFAULT_3: "#ee65bf",
};

export const Color = {
  ...Brand,
  ...Primary,
  ...Secondary,
  ...Tretiary,
};

export default Color;
