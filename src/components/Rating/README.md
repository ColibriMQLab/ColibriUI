# Rating

Rating displays a numeric score with one, five, or ten icons. It supports fractional values, custom icons, helper text, value placement, two visual modes, and the same size scale used by the rest of Colibri UI.

```tsx
<Rating value={4.7} precision={1} helperText="Based on 128 reviews" />
```

The component uses existing theme tokens for color, typography, and spacing. Filled and outline icons use the theme accent color by default: lime in BA and pink in Jaipur. Use `fillColor` when you need a custom icon color, such as yellow, and `outlineColor` if the outline should differ.

```tsx
<Rating value={3.8} helperText="Based on 128 reviews" />
<Rating
  value={3.8}
  fillColor="var(--color-yellow-400)"
  helperText="Based on 128 reviews"
/>
<Rating value={7.6} iconQuantity={10} precision={2} />
<Rating value={4.9} iconQuantity={1} size="displayS" />
```
