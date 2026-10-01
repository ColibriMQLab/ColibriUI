# Sheet

A bottom sheet with a fixed header and footer, scrollable content, pointer dragging and optional modal overlay.

```tsx
import { Sheet, Button } from "colibri-ui";

<Sheet
  open={open}
  onOpenChange={setOpen}
  title="Settings"
  snapPoints={["30dvh", "60dvh", "90dvh"]}
  defaultSnapPoint="60dvh"
  footer={<Button onClick={() => setOpen(false)}>Done</Button>}
>
  Settings content
</Sheet>;
```

| Prop                                   | Default          | Description                                                                                                         |
| -------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `open`                                 | Required         | Controlled visibility.                                                                                              |
| `onOpenChange`                         | Required         | Receives visibility and an optional close reason: `overlay`, `escape` or `drag`.                                    |
| `title`, `description`                 | —                | Heading and accessible description.                                                                                 |
| `header`, `footer`                     | —                | Header actions and fixed footer content.                                                                            |
| `children`                             | —                | Scrollable body content.                                                                                            |
| `snapPoints`                           | `["60dvh"]`      | Available heights: numbers (pixels), px, %, vh or dvh strings. An empty list uses the default.                      |
| `snapPoint`                            | —                | Controlled height; must belong to snapPoints.                                                                       |
| `defaultSnapPoint`                     | First snap point | Initial uncontrolled height.                                                                                        |
| `onSnapPointChange`                    | —                | Called when a drag selects a height.                                                                                |
| `modal`                                | `true`           | Enables the overlay and focus trap and joins the `Modal` stack, so only the topmost layer reacts to Escape and Tab. |
| `blurOverlay`                          | `false`          | Blurs the modal background.                                                                                         |
| `closeOnOverlayClick`, `closeOnEscape` | `true`           | Enable the corresponding close requests.                                                                            |
| `draggable`, `showHandle`              | `true`           | Enable pointer resizing and show the handle independently.                                                          |
| `lockBodyScroll`                       | `true`           | Locks page scrolling in modal mode.                                                                                 |
| `portalContainer`                      | `document.body`  | Portal target; ensure it inherits the theme variables.                                                              |
| `initialFocusRef`, `returnFocusRef`    | —                | Override initial focus and focus restoration.                                                                       |
| `zIndex`                               | Theme token      | Overrides the root stacking order.                                                                                  |
| `className`, `style`, HTML attributes  | —                | Applied to the dialog panel. Height is managed by snap points.                                                      |

The forwarded ref points to the dialog panel. Without a title, supply an
`aria-label` or `aria-labelledby`. Opening focuses the first focusable element
(or the panel); closing restores the previous focus unless overridden.

Styling uses `component-sheet-*` tokens defined in both Buenos Aires and Jaipur.
Reduced motion follows the operating system preference. Numeric pixel heights
remain supported as consumer input; component styles use theme tokens.
