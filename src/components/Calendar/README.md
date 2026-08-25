# Calendar

```tsx
<Calendar
  selectionMode="single"
  value={date}
  onChange={setDate}
  locale="en-US"
/>
```

A standalone React calendar built with TypeScript and CSS Modules. The component uses internal theme tokens for color, spacing, radius, typography, focus, and control sizing.

Use `selectionMode="range"` with `[start, end]` values for range picking. Two-month layouts are enabled with `monthsToShow={2}`.

The header includes previous and next buttons plus a period button. Clicking the period button switches from days to months and then to years; selecting a month or year drills back down. The component supports controlled visible month state, min and max dates, disabled dates, events, neighboring month days, localization, `xs` through `xl` sizes, keyboard navigation, and accessible labels.
