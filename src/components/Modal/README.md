# Modal

A dialog rendered through a portal with overlay, Escape and overlay-click closing, scroll lock and focus trap.

## Compound API

```tsx
<Modal onClose={close}>
  <Modal.Header>
    <Modal.Title>Title</Modal.Title>
  </Modal.Header>
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>
    <Button onClick={close}>Save</Button>
  </Modal.Footer>
</Modal>
```

The parts are also exported as `ModalHeader`, `ModalTitle`, `ModalBody` and `ModalFooter`.

### Overlay header

`Modal.Header overlay` is positioned above the body instead of taking space before it. The header background is transparent, so the body can fill the whole modal (maps, media, galleries). Empty header areas let pointer events pass through to the body; header children stay interactive. Backgrounds of elements inside the header are up to the consumer. The close button gets its own surface in this mode.

```tsx
<Modal onClose={close}>
  <Modal.Header overlay>
    <SearchCard />
    <Button>Filters</Button>
  </Modal.Header>
  <Modal.Body bleed>
    <Map />
  </Modal.Body>
</Modal>
```

## Props

### Modal

| Prop        | Type         | Description                                                                                      |
| ----------- | ------------ | ------------------------------------------------------------------------------------------------ |
| `onClose`   | `() => void` | Called by the close button, Escape and overlay click.                                            |
| `title`     | `string`     | Legacy shorthand. Used only when children contain no `Modal.Header`, `Modal.Body` or `Modal.Footer`. |
| `className` | `string`     | Class for the modal window, for example to set a fixed size.                                     |

### Modal.Header

| Prop             | Type      | Default         | Description                                            |
| ---------------- | --------- | --------------- | ------------------------------------------------------ |
| `overlay`        | `boolean` | `false`         | Transparent header positioned above the body.          |
| `closeAriaLabel` | `string`  | `"Close modal"` | Accessible label of the close button.                  |

The close button is always rendered as the last header item. Other `div` attributes are forwarded.

### Modal.Title

Renders an `h3` and labels the dialog through `aria-labelledby`.

### Modal.Body

| Prop    | Type      | Default | Description                                 |
| ------- | --------- | ------- | ------------------------------------------- |
| `bleed` | `boolean` | `false` | Removes padding so content goes edge to edge. |

The body is the scroll container.

### Modal.Footer

A fixed row for actions, aligned to the end.

## Behavior notes

- Compound mode is detected by direct children. Wrapping parts in a Fragment or a custom component switches the modal to legacy mode.
- A close button is always present: if compound children have no `Modal.Header`, a standalone close row is rendered.
- Legacy mode keeps the previous markup: `<Modal title="...">content</Modal>`.
