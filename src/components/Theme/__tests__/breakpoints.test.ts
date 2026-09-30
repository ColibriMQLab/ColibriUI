import { BREAKPOINTS, media } from "../breakpoints";

describe("breakpoints", () => {
  it("matches the breakpoint contract shared with the apps", () => {
    expect(BREAKPOINTS).toEqual({
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      "2xl": "96rem",
    });
  });

  it("builds range media queries", () => {
    expect(media.up("md")).toBe("(width >= 48rem)");
    expect(media.down("md")).toBe("(width < 48rem)");
    expect(media.between("md", "lg")).toBe("(48rem <= width < 64rem)");
    expect(media.up("2xl")).toBe("(width >= 96rem)");
  });
});
