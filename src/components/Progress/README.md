# Progress

A linear progress indicator.

```tsx
<Progress
  value={65}
  view="accent"
  label="File upload"
  caption="About two minutes remaining"
/>
```

The value is clamped to the 0-100 range. Supported options include `s`, `m`, and `l` sizes; `2`, `4`, `6`, and `8` bar sizes; label and value placement; a label icon; caption text; and status-oriented visual views.

The component uses native `progressbar` accessibility semantics and existing internal theme tokens for color, spacing, radius, and typography.
