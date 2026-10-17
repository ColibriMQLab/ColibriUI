# NavigationMenu

Section navigation built from pill links. In the `overflow` layout the items stay in one row and the ones that do not fit the width move to the "More" dropdown. The active item always stays visible. In the `scroll` layout the items form a horizontal strip without a scrollbar that scrolls to the active item by itself.

```tsx
import {
  NavigationMenu,
  type NavigationMenuItem,
} from "@components/NavigationMenu";

const items: NavigationMenuItem[] = [
  { id: "cinema", label: "Cinema", href: "/cinema" },
  { id: "concert", label: "Concerts", href: "/concert" },
  { id: "theatre", label: "Theatre", href: "/theatre", active: true },
];

// Desktop: fills the parent width
<NavigationMenu
  aria-label="Sections"
  items={items}
  pinnedItems={[{ id: "sale", label: "Sale", href: "/sale" }]}
  moreItems={[{ id: "free", label: "Free", href: "/free" }]}
/>;

// Touch
<NavigationMenu aria-label="Sections" items={items} layout="scroll" size="s" />;
```

The component does not detect touch screens. Choose the layout yourself, for example with `useMediaSizes`.

## Props

| Prop          | Type                                            | Default      | Description                                                                                                                               |
| ------------- | ----------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `items`       | `NavigationMenuItem[]`                          | Required     | Main items. In the `overflow` layout the ones that do not fit move to "More".                                                             |
| `pinnedItems` | `NavigationMenuItem[]`                          | `[]`         | Always visible after `items`.                                                                                                             |
| `moreItems`   | `NavigationMenuItem[]`                          | `[]`         | Always inside "More", after the items that do not fit. When not empty, "More" is always shown. In the `scroll` layout they end the strip. |
| `layout`      | `"overflow" \| "scroll"`                        | `"overflow"` | Row with "More" or a horizontal scroll strip.                                                                                             |
| `size`        | `"s" \| "m"`                                    | `"m"`        | Item size. `s` suits touch screens.                                                                                                       |
| `moreLabel`   | `ReactNode`                                     | `"More"`     | Text of the "More" trigger.                                                                                                               |
| `onItemClick` | `(item: NavigationMenuItem) => void`            | `undefined`  | Called on a click on any item, including the ones inside "More".                                                                          |
| `renderLink`  | `(props: NavigationMenuLinkProps) => ReactNode` | `<a href>`   | Custom link, for example a router `Link`. Used inside "More" too.                                                                         |
| `ref`         | `Ref<HTMLElement>`                              | `undefined`  | The `<nav>` element, forwarded with `forwardRef` for React 18 and 19.                                                                     |

Other props, such as `aria-label`, `id` and `className`, go to the `<nav>` element. Give the menu an `aria-label` when the page has more than one navigation.

### NavigationMenuItem

| Field    | Type        | Description                                                                      |
| -------- | ----------- | -------------------------------------------------------------------------------- |
| `id`     | `string`    | Unique key. Defaults to `href`, then to `label`.                                 |
| `label`  | `string`    | Item text.                                                                       |
| `href`   | `string`    | Link URL. Without it the default `<a>` is not focusable.                         |
| `active` | `boolean`   | Current section: highlighted, gets `aria-current="page"`, never moves to "More". |
| `icon`   | `ReactNode` | Icon before the label.                                                           |

### Router links

`renderLink` receives ready `className`, `children`, `onClick`, `role` and `aria-current`. Pass everything except `item` to your link:

```tsx
import Link from "next/link";

<NavigationMenu
  items={items}
  renderLink={({ item, ...props }) => (
    <Link href={item.href ?? "#"} {...props} />
  )}
/>;
```

Do not add styles that change the link width: the widths are measured on plain elements with the same class.

## Behavior

- A hidden measurer renders every item in one row with the same styles. Widths come from it, so the items inside "More" are measured too.
- Items go from left to right while they fit. The first item that does not fit and all after it move to "More". Space for the active item is reserved first, so its neighbours move instead.
- The gap is read from CSS. `ResizeObserver` recalculates the split when the window, the parent width or the loaded web font changes the widths.
- Before the first measurement, and on the server, all items are rendered with `overflow: hidden` and without "More". The measurement runs in a layout effect, so there is no flash.
- "More" opens on click, Enter or Space and moves focus to the active or the first link. Arrow keys, Home and End move between links. Escape, Tab and a link click close the dropdown and return focus to the trigger.
- The "More" trigger stays in the DOM to be measured. When it is not needed, it is invisible, hidden from assistive technology and removed from the Tab order.
- If a resize removes "More" while a link inside it has focus, focus moves to the same item in the row, or to the first row link.
- The dropdown is portaled, so a parent with `overflow: hidden` does not clip it.

## Theme tokens

Only the colors that differ between themes are theme tokens:

| Token                                       | Use                      |
| ------------------------------------------- | ------------------------ |
| `--component-navigation-item-text`          | Item text                |
| `--component-navigation-item-bg-hover`      | Item background on hover |
| `--component-navigation-item-bg-selected`   | Active item background   |
| `--component-navigation-item-text-selected` | Active item text         |
| `--component-navigation-item-focus-ring`    | Focus ring               |

The dropdown uses the `--component-menu-*` tokens. Sizes come from the shared `--space-*`, `--font-size-*` and `--radius-*` tokens.

## Notes

- In a flex header row next to a logo give the menu `flex: 1`. It already has `min-width: 0` and can shrink.
