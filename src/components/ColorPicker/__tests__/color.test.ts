import {
  hex2hsv,
  hsv2hex,
  isLightColor,
  normalizeHex,
  prefersLightText,
  toHex,
  toHsvPreservingHue,
} from "../utils/color";

describe("ColorPicker color utils", () => {
  it("normalizes HEX", () => {
    expect(normalizeHex("#ABC")).toBe("#aabbcc");
    expect(normalizeHex(" 0B8043 ")).toBe("#0b8043");
    expect(normalizeHex("#abcd")).toBeNull();
    expect(normalizeHex("red")).toBeNull();
  });

  it("converts rgb() to HEX", () => {
    expect(toHex("rgb(216, 27, 96)")).toBe("#d81b60");
    expect(toHex("rgba(0, 0, 0, 0.5)")).toBe("#000000");
    expect(toHex("nope")).toBeNull();
  });

  it("round-trips HEX through HSV", () => {
    ["#d81b60", "#0b8043", "#ffffff", "#000000", "#7986cb"].forEach((hex) => {
      const hsv = hex2hsv(hex);

      expect(hsv && hsv2hex(hsv)).toBe(hex);
    });
  });

  it("keeps hue and saturation for black and grey", () => {
    const prev = { h: 200, s: 60, v: 80 };

    expect(toHsvPreservingHue("#000000", prev)).toEqual({
      h: 200,
      s: 60,
      v: 0,
    });
    expect(toHsvPreservingHue("#808080", prev)).toMatchObject({ h: 200, s: 0 });
    expect(toHsvPreservingHue("nope", prev)).toBeNull();
  });

  it("picks readable text and outlines light colors", () => {
    expect(prefersLightText("#0b8043")).toBe(true);
    expect(prefersLightText("#f6bf26")).toBe(false);
    expect(isLightColor("#ffffff")).toBe(true);
    expect(isLightColor("#d81b60")).toBe(false);
  });
});
