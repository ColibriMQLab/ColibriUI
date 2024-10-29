import generateUniqID from "../generateUniqID";

describe("generateUniqID()", () => {
  it("Does contain uniq-id-*", () => {
    expect(generateUniqID(1)).to.contain("uniq-id-");
  });
});
