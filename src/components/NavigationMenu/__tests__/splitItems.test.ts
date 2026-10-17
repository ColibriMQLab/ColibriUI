import { splitItems } from "../splitItems";

const base = {
  itemWidths: [100, 100, 100, 100, 100],
  pinnedWidths: [],
  moreWidth: 80,
  gap: 10,
  activeIndex: -1,
  forceMore: false,
};

describe("splitItems", () => {
  it("keeps every item when they fit with gaps", () => {
    expect(splitItems({ ...base, containerWidth: 540 })).toEqual({
      visible: [0, 1, 2, 3, 4],
      hidden: [],
    });
  });

  it("moves the first item that does not fit and all after it to More", () => {
    // 2 items + More: 100 + 10 + 100 + 10 + 80 = 300
    expect(splitItems({ ...base, containerWidth: 300 })).toEqual({
      visible: [0, 1],
      hidden: [2, 3, 4],
    });
  });

  it("keeps the active item and moves its neighbours", () => {
    expect(
      splitItems({ ...base, containerWidth: 300, activeIndex: 4 }),
    ).toEqual({ visible: [0, 4], hidden: [1, 2, 3] });
  });

  it("keeps the first item when it is active", () => {
    expect(
      splitItems({ ...base, containerWidth: 200, activeIndex: 0 }),
    ).toEqual({ visible: [0], hidden: [1, 2, 3, 4] });
  });

  it("reserves space for pinned items", () => {
    expect(
      splitItems({ ...base, pinnedWidths: [100], containerWidth: 300 }),
    ).toEqual({ visible: [0], hidden: [1, 2, 3, 4] });
  });

  it("reserves space for More when it is forced", () => {
    expect(
      splitItems({ ...base, containerWidth: 540, forceMore: true }),
    ).toEqual({ visible: [0, 1, 2, 3], hidden: [4] });
  });
});
