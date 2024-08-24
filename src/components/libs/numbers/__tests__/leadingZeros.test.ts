import { leadingZeros } from "../leadingZeros";

describe("Lib. Numbers. leadingZeros", () => {
  it("should return proper strings", () => {
    expect(leadingZeros(1, 0)).toBe("1");
    expect(leadingZeros(1, 1)).toBe("1");
    expect(leadingZeros(1, 2)).toBe("01");
    expect(leadingZeros(1, 3)).toBe("001");
  });
});
