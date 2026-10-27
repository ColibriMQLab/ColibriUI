# Dropdown

A floating panel opened from a trigger by hover, click or focus.

```tsx
<Dropdown
  data-testid="sort-menu"
  trigger={["click"]}
  overlay={
    <Menu>
      <MenuItem key="price">Price</MenuItem>
    </Menu>
  }
>
  <Button data-testid="sort">Sort</Button>
</Dropdown>
```

## Test ids

`Dropdown` has no root element of its own:

- `data-testid` on `Dropdown` names the floating panel (`role="menu"`). The panel is in the DOM only while open.
- The trigger is your element. It keeps its own `data-testid`; `Dropdown` never writes one on it.
