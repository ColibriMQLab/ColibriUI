import generateUniqID from "../generateUniqID";

describe("generateUniqID()", () => {
  it("Does contain uniq-id-*", () => {
    expect(generateUniqID(1)).toContain("uniq-id-");
  });
});
