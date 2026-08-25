# Card

A composable card container for media and arbitrary React content.

```tsx
<Card size="m" backgroundType="solid" selected>
  <CardContent aspectRatio="4 / 3">
    <img src="/image.jpg" alt="" />
    <CardInnerContent>
      <h3>Image overlay title</h3>
    </CardInnerContent>
  </CardContent>
</Card>
```

- `Card` controls size, orientation, background, and selected state.
- `CardContent` clips media to the card radius and supports `aspectRatio`.
- `CardInnerContent` renders an absolute layer over media content.

The component uses the existing internal theme tokens for colors, spacing, borders, radii, and typography.
