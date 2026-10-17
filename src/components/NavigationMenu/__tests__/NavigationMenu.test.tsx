import React, { createRef } from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { NavigationMenu } from "..";
import type { NavigationMenuItem, NavigationMenuProps } from "..";

const items: NavigationMenuItem[] = [
  { id: "cinema", label: "Cinema", href: "#cinema" },
  { id: "concert", label: "Concerts", href: "#concert" },
  { id: "theatre", label: "Theatre", href: "#theatre" },
  { id: "art", label: "Art", href: "#art" },
  { id: "kids", label: "Kids", href: "#kids" },
];

const ITEM_WIDTH = 100;
const MORE_WIDTH = 80;
let containerWidth = 1000;

type ResizeCallback = (entries: ResizeObserverEntry[]) => void;

let resizeCallbacks: ResizeCallback[] = [];
const originalResizeObserver = global.ResizeObserver;

// Simulates a container resize after `containerWidth` changes.
const resize = (width: number) => {
  containerWidth = width;
  act(() => resizeCallbacks.forEach((callback) => callback([])));
};

// jsdom has no layout: the nav is the container, measurer spans are items,
// the list item with a button is the "More" trigger.
beforeEach(() => {
  containerWidth = 1000;
  resizeCallbacks = [];
  global.ResizeObserver = class {
    constructor(callback: ResizeCallback) {
      resizeCallbacks.push(callback);
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
  jest
    .spyOn(HTMLElement.prototype, "getBoundingClientRect")
    .mockImplementation(function (this: HTMLElement) {
      let width = 0;

      if (this.tagName === "NAV") width = containerWidth;
      else if (this.parentElement?.classList.contains("measurer"))
        width = ITEM_WIDTH;
      else if (this.tagName === "LI" && this.querySelector("button"))
        width = MORE_WIDTH;

      return { width } as DOMRect;
    });
});

afterEach(() => {
  global.ResizeObserver = originalResizeObserver;
  jest.restoreAllMocks();
});

const renderMenu = (props: Partial<NavigationMenuProps> = {}) =>
  render(<NavigationMenu items={items} aria-label="Sections" {...props} />);

const getNav = () => screen.getByRole("navigation", { name: "Sections" });
const getRowLinks = () =>
  within(getNav())
    .queryAllByRole("link")
    .map((link) => link.textContent);
const getMore = () => screen.getByRole("button", { name: "More" });

// Floating UI positions the dropdown asynchronously.
const openMore = async () => {
  fireEvent.click(getMore());
  await act(async () => {});
};

describe("<NavigationMenu />", () => {
  it("shows every item and hides More when items fit", () => {
    renderMenu();

    expect(getRowLinks()).toEqual([
      "Cinema",
      "Concerts",
      "Theatre",
      "Art",
      "Kids",
    ]);
    expect(screen.queryByRole("button", { name: "More" })).toBeNull();
  });

  it("moves the items that do not fit to More", async () => {
    containerWidth = 300;
    renderMenu();

    expect(getRowLinks()).toEqual(["Cinema", "Concerts"]);

    await openMore();

    const options = screen.getAllByRole("menuitem");
    expect(options.map((option) => option.textContent)).toEqual([
      "Theatre",
      "Art",
      "Kids",
    ]);
    expect(options[0]).toHaveFocus();
  });

  it("keeps the active item in the row", () => {
    containerWidth = 300;
    renderMenu({
      items: items.map((item) => ({ ...item, active: item.id === "kids" })),
    });

    expect(getRowLinks()).toEqual(["Cinema", "Kids"]);
    expect(screen.getByRole("link", { name: "Kids" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("keeps pinned items visible and moreItems inside More", async () => {
    renderMenu({
      pinnedItems: [{ id: "sale", label: "Sale", href: "#sale" }],
      moreItems: [{ id: "free", label: "Free", href: "#free" }],
    });

    expect(getRowLinks()).toEqual([
      "Cinema",
      "Concerts",
      "Theatre",
      "Art",
      "Kids",
      "Sale",
    ]);

    await openMore();

    expect(screen.getByRole("menuitem", { name: "Free" })).toBeInTheDocument();
  });

  it("calls onItemClick, closes More and returns focus to the trigger", async () => {
    containerWidth = 300;
    const onItemClick = jest.fn();
    renderMenu({ onItemClick });

    fireEvent.click(screen.getByRole("link", { name: "Cinema" }));
    expect(onItemClick).toHaveBeenLastCalledWith(items[0]);

    await openMore();
    fireEvent.click(screen.getByRole("menuitem", { name: "Art" }));

    expect(onItemClick).toHaveBeenLastCalledWith(items[3]);
    expect(screen.queryByRole("menuitem")).toBeNull();
    expect(getMore()).toHaveFocus();
  });

  it("moves focus with arrow keys and closes on Escape", async () => {
    containerWidth = 300;
    renderMenu();

    await openMore();
    const [theatre, art, kids] = screen.getAllByRole("menuitem");

    fireEvent.keyDown(theatre, { key: "ArrowDown" });
    expect(art).toHaveFocus();
    fireEvent.keyDown(art, { key: "End" });
    expect(kids).toHaveFocus();
    fireEvent.keyDown(kids, { key: "ArrowDown" });
    expect(theatre).toHaveFocus();
    fireEvent.keyDown(theatre, { key: "ArrowUp" });
    expect(kids).toHaveFocus();

    fireEvent.keyDown(kids, { key: "Escape" });

    expect(screen.queryByRole("menuitem")).toBeNull();
    expect(getMore()).toHaveFocus();
  });

  it("puts new items into More when the list grows", async () => {
    containerWidth = 250;
    const { rerender } = renderMenu({ items: items.slice(0, 3) });

    expect(getRowLinks()).toEqual(["Cinema"]);

    rerender(<NavigationMenu items={items} aria-label="Sections" />);
    await openMore();

    expect(getRowLinks()).toEqual(["Cinema"]);
    expect(
      screen.getAllByRole("menuitem").map((option) => option.textContent),
    ).toEqual(["Concerts", "Theatre", "Art", "Kids"]);
  });

  it("drops removed items from open More when the list shrinks", async () => {
    containerWidth = 250;
    const { rerender } = renderMenu();

    await openMore();
    expect(screen.getAllByRole("menuitem")).toHaveLength(4);

    rerender(
      <NavigationMenu items={items.slice(0, 3)} aria-label="Sections" />,
    );
    await act(async () => {});

    expect(getRowLinks()).toEqual(["Cinema"]);
    expect(
      screen.getAllByRole("menuitem").map((option) => option.textContent),
    ).toEqual(["Concerts", "Theatre"]);
  });

  it("moves focus to the row when More disappears with a focused link", async () => {
    containerWidth = 300;
    renderMenu();

    await openMore();
    fireEvent.keyDown(screen.getByRole("menuitem", { name: "Theatre" }), {
      key: "ArrowDown",
    });
    expect(screen.getByRole("menuitem", { name: "Art" })).toHaveFocus();

    resize(1000);
    await act(async () => {});

    expect(screen.queryByRole("menuitem")).toBeNull();
    expect(screen.getByRole("link", { name: "Art" })).toHaveFocus();
  });

  it("forwards ref to the nav element in both layouts", () => {
    const overflowRef = createRef<HTMLElement>();
    const scrollRef = createRef<HTMLElement>();

    render(
      <>
        <NavigationMenu ref={overflowRef} items={items} aria-label="Row" />
        <NavigationMenu
          ref={scrollRef}
          items={items}
          layout="scroll"
          aria-label="Strip"
        />
      </>,
    );

    expect(overflowRef.current).toBe(
      screen.getByRole("navigation", { name: "Row" }),
    );
    expect(scrollRef.current).toBe(
      screen.getByRole("navigation", { name: "Strip" }),
    );
  });

  it("renders custom links", () => {
    renderMenu({
      renderLink: ({ item, ...props }) => (
        <a {...props} href={`/app${item.href}`} data-testid="custom" />
      ),
    });

    expect(screen.getAllByTestId("custom")).toHaveLength(items.length);
    expect(screen.getByRole("link", { name: "Cinema" })).toHaveAttribute(
      "href",
      "/app#cinema",
    );
  });

  it("renders every item in the scroll layout", () => {
    renderMenu({
      layout: "scroll",
      pinnedItems: [{ id: "sale", label: "Sale", href: "#sale" }],
      moreItems: [{ id: "free", label: "Free", href: "#free" }],
    });

    expect(getRowLinks()).toHaveLength(7);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("has no accessibility violations with open More", async () => {
    containerWidth = 300;
    const { container } = renderMenu();

    await openMore();

    expect(await axe(container)).toHaveNoViolations();
    // The dropdown is portaled to the body, outside of the page landmarks.
    expect(
      await axe(document.body, { rules: { region: { enabled: false } } }),
    ).toHaveNoViolations();
  });
});
