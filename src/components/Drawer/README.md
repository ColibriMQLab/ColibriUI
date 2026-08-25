# Drawer

A slide-in panel rendered through a portal.

```tsx
<Drawer
  opened={opened}
  onClose={() => setOpened(false)}
  width="calc(var(--space-32) * 3)"
>
  <DrawerHeader onClose={() => setOpened(false)}>Settings</DrawerHeader>
  <DrawerContent>Content</DrawerContent>
  <DrawerFooter>Actions</DrawerFooter>
</Drawer>
```

The component supports four placements, custom portal containers, overlay blur, closing by Escape or overlay click, modal and non-modal modes, scroll lock, focus trap, focus restoration, custom dimensions, offset, background colors, and custom animations.

Use `opened` to control visibility. The visual layer is connected to existing internal theme tokens without extending the theme.
