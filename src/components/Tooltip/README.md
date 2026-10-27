# Tooltip

A hint shown next to its trigger on hover.

```tsx
<Tooltip data-testid="price-hint" content="Includes VAT">
  <Button data-testid="price">£40</Button>
</Tooltip>
```

## Test ids

`Tooltip` has no root element of its own:

- `data-testid` on `Tooltip` names the tooltip panel (`role="tooltip"`). The panel is in the DOM only while shown.
- The trigger is your element. It keeps its own `data-testid`; `Tooltip` never writes one on it.
