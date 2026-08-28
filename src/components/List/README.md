# List

List renders grouped or flat collections with native list semantics. Items can be static content, buttons through `onAction`, or links through `href`.

```tsx
import { Chevron, List, ListItem, User } from "@colibri/ui";

export const Example = () => {
  const openProfile = () => undefined;
  const chevronRight = <Chevron aria-hidden="true" style={{ transform: "rotate(-90deg)" }} />;

  return (
    <List surface="container" dividers ariaLabel="Settings">
      <ListItem contentLeft={<User />} onAction={openProfile}>
        Profile
      </ListItem>
      <ListItem href="/notifications" contentRight={chevronRight}>
        Notifications
      </ListItem>
    </List>
  );
};
```

## List Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ariaLabel` | `string` | - | Accessible label mapped to `aria-label`. |
| `density` | `"compact"` or `"normal"` | `"normal"` | Controls vertical item spacing. |
| `disabled` | `boolean` | `false` | Disables all interactive items in the list. |
| `dividers` | `boolean` | `false` | Shows dividers between items. |
| `size` | `"s"`, `"m"`, or `"l"` | `"m"` | Controls item typography and height. |
| `surface` | `"none"`, `"container"`, or `"items"` | `"none"` | Controls whether the list or each item has a surface. |
| `children` | `ReactNode` | - | List items or sections. |
| HTML `ul` props | `HTMLAttributes<HTMLUListElement>` | - | Other native list attributes. |

## ListItem Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | Required | Main item label. |
| `className` | `string` | - | Class name for the `li` element. |
| `contentLeft` | `ReactNode` | - | Leading content, usually an icon or avatar. |
| `contentRight` | `ReactNode` | - | Trailing content, usually an icon or metadata. |
| `description` | `ReactNode` | - | Secondary text below the label. |
| `disabled` | `boolean` | `false` | Disables this item. |
| `selected` | `boolean` | `false` | Marks the item as selected. |
| `onAction` | `() => void` | - | Renders the item as a button and calls this handler on click. |
| `href` | `string` | - | Renders the item as a link. |
| Link props | `AnchorHTMLAttributes<HTMLAnchorElement>` | - | Native anchor props when `href` is provided. |
| Button props | `ButtonHTMLAttributes<HTMLButtonElement>` | - | Native button props when `onAction` is provided. |
| Static item props | `HTMLAttributes<HTMLLIElement>` | - | Native list item props when neither `href` nor `onAction` is provided. |

## ListSection Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | Required | Items rendered inside the section. |
| `title` | `ReactNode` | - | Section heading. |
| `className` | `string` | - | Class name for the section `li`. |
| HTML `li` props | `HTMLAttributes<HTMLLIElement>` | - | Other native section item attributes. |
