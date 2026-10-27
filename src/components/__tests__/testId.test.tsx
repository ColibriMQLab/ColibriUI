import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Accordion,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Chip,
  Counter,
  Datepicker,
  DotsLoader,
  Dropdown,
  Grid,
  Menu,
  MenuItem,
  Modal,
  MultiSelect,
  Select,
  Separator,
  SkeletonRect,
  SkeletonText,
  Status,
  Tooltip,
} from "..";
import { InputRadio } from "../InputRadio";
import type { ReactElement } from "react";

const TEST_ID = "component-under-test";
const testId = { "data-testid": TEST_ID };

/** Components whose own root element is the first child of the container. */
const ROOTED: [string, ReactElement][] = [
  ["Accordion", <Accordion key="a" title="Title" {...testId} />],
  ["Avatar", <Avatar key="a" initials="AB" {...testId} />],
  ["Badge", <Badge key="a" content={1} {...testId} />],
  [
    "Button",
    <Button key="a" {...testId}>
      Save
    </Button>,
  ],
  ["Checkbox", <Checkbox key="a" label="Agree" {...testId} />],
  [
    "Chip",
    <Chip key="a" {...testId}>
      Chip
    </Chip>,
  ],
  [
    "Counter",
    <Counter
      key="a"
      value={1}
      min={0}
      max={3}
      onChange={jest.fn()}
      {...testId}
    />,
  ],
  ["Datepicker", <Datepicker key="a" {...testId} />],
  ["DotsLoader", <DotsLoader key="a" {...testId} />],
  ["Grid", <Grid key="a" {...testId} />],
  ["InputRadio", <InputRadio key="a" value="a" text="A" {...testId} />],
  [
    "Menu",
    <Menu key="a" {...testId}>
      <MenuItem key="one">One</MenuItem>
    </Menu>,
  ],
  [
    "MultiSelect",
    <MultiSelect key="a" groups={[]} onChange={jest.fn()} {...testId} />,
  ],
  ["Select", <Select key="a" options={[]} onChange={jest.fn()} {...testId} />],
  ["Separator", <Separator key="a" {...testId} />],
  ["SkeletonRect", <SkeletonRect key="a" {...testId} />],
  ["SkeletonText", <SkeletonText key="a" {...testId} />],
  [
    "Status",
    <Status key="a" {...testId}>
      Active
    </Status>,
  ],
];

describe("data-testid", () => {
  it.each(ROOTED)("%s puts it on its root element", (_, element) => {
    const { container } = render(element);

    expect(screen.getByTestId(TEST_ID)).toBe(container.firstElementChild);
  });

  it("Modal puts it on the dialog", () => {
    render(<Modal {...testId}>Body</Modal>);

    expect(screen.getByTestId(TEST_ID)).toBe(screen.getByRole("dialog"));
  });

  it.each(ROOTED)("%s sets no test id of its own", (_, element) => {
    const { container } = render(
      React.cloneElement(element, { "data-testid": undefined }),
    );

    expect(container.querySelector("[data-testid]")).toBeNull();
  });
});

describe("data-testid of a popup", () => {
  it("Dropdown names the open panel and leaves the trigger's own id", () => {
    render(
      <Dropdown {...testId} trigger={["click"]} overlay={<span>Panel</span>}>
        <button data-testid="trigger" type="button">
          Open
        </button>
      </Dropdown>,
    );

    expect(screen.queryByTestId(TEST_ID)).toBeNull();

    fireEvent.click(screen.getByTestId("trigger"));

    expect(screen.getByTestId(TEST_ID)).toBe(screen.getByRole("menu"));
    expect(screen.getByTestId("trigger")).toHaveTextContent("Open");
  });

  it("Tooltip names the shown panel and leaves the trigger's own id", async () => {
    render(
      <Tooltip {...testId} content="Hint">
        <button data-testid="trigger" type="button">
          Price
        </button>
      </Tooltip>,
    );

    expect(screen.queryByTestId(TEST_ID)).toBeNull();

    await userEvent.hover(screen.getByTestId("trigger"));

    expect(await screen.findByTestId(TEST_ID)).toBe(
      screen.getByRole("tooltip"),
    );
    expect(screen.getByTestId("trigger")).toHaveTextContent("Price");
  });
});
