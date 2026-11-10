import React, { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { List, ListItem } from "..";
import type { ListLinkProps, ListRenderLink } from "..";

const routerLink =
  (testId: string, onRender?: (props: ListLinkProps) => void): ListRenderLink =>
  (props) => {
    onRender?.(props);
    return <a {...props} data-testid={testId} />;
  };

describe("<ListItem /> with href", () => {
  it("renders a plain link without renderLink", () => {
    render(
      <List>
        <ListItem href="/profile">Profile</ListItem>
      </List>,
    );

    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute(
      "href",
      "/profile",
    );
  });

  it("renders the link from renderLink of the List", () => {
    const onRender = jest.fn();
    const onAction = jest.fn();
    const onClick = jest.fn();

    render(
      <List renderLink={routerLink("list-link", onRender)}>
        <ListItem
          href="/profile"
          selected
          onClick={onClick}
          onAction={onAction}
        >
          Profile
        </ListItem>
      </List>,
    );

    const link = screen.getByTestId("list-link");
    expect(link).toHaveAttribute("href", "/profile");
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link).toHaveTextContent("Profile");

    const props = onRender.mock.calls[0][0] as ListLinkProps;
    expect(props.href).toBe("/profile");
    expect(props.className).toEqual(expect.any(String));
    expect(props.className).not.toBe("");
    expect(props["aria-current"]).toBe("page");
    expect(props.onClick).toEqual(expect.any(Function));

    fireEvent.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("renders the link from renderLink of the ListItem", () => {
    const onRender = jest.fn();

    render(
      <List>
        <ListItem
          href="/profile"
          renderLink={routerLink("item-link", onRender)}
        >
          Profile
        </ListItem>
      </List>,
    );

    const link = screen.getByTestId("item-link");
    expect(link).toHaveAttribute("href", "/profile");
    expect(link).not.toHaveAttribute("aria-current");

    const props = onRender.mock.calls[0][0] as ListLinkProps;
    expect(props.className).not.toBe("");
    expect(props.onClick).toEqual(expect.any(Function));
  });

  it("prefers renderLink of the ListItem over the List", () => {
    render(
      <List renderLink={routerLink("list-link")}>
        <ListItem href="/profile" renderLink={routerLink("item-link")}>
          Profile
        </ListItem>
        <ListItem href="/settings">Settings</ListItem>
      </List>,
    );

    expect(screen.getByTestId("item-link")).toHaveTextContent("Profile");
    expect(screen.getByTestId("list-link")).toHaveTextContent("Settings");
  });

  it("passes no href and calls no onAction for a disabled item", () => {
    const onRender = jest.fn();
    const onAction = jest.fn();

    render(
      <List renderLink={routerLink("list-link", onRender)}>
        <ListItem href="/profile" disabled onAction={onAction}>
          Profile
        </ListItem>
      </List>,
    );

    const link = screen.getByTestId("list-link");
    expect(link).not.toHaveAttribute("href");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
    expect((onRender.mock.calls[0][0] as ListLinkProps).href).toBeUndefined();

    fireEvent.click(link);
    expect(onAction).not.toHaveBeenCalled();
  });

  it("disables the custom link through the List", () => {
    const onAction = jest.fn();

    render(
      <List disabled renderLink={routerLink("list-link")}>
        <ListItem href="/profile" onAction={onAction}>
          Profile
        </ListItem>
      </List>,
    );

    const link = screen.getByTestId("list-link");
    expect(link).not.toHaveAttribute("href");

    fireEvent.click(link);
    expect(onAction).not.toHaveBeenCalled();
  });

  it("keeps the ref on the li", () => {
    const plainRef = createRef<HTMLLIElement>();
    const customRef = createRef<HTMLLIElement>();

    render(
      <List>
        <ListItem ref={plainRef} href="/profile">
          Profile
        </ListItem>
        <ListItem
          ref={customRef}
          href="/settings"
          renderLink={routerLink("item-link")}
        >
          Settings
        </ListItem>
      </List>,
    );

    expect(plainRef.current?.tagName).toBe("LI");
    expect(plainRef.current).toContainElement(
      screen.getByRole("link", { name: "Profile" }),
    );
    expect(customRef.current?.tagName).toBe("LI");
    expect(customRef.current).toContainElement(screen.getByTestId("item-link"));
  });
});
