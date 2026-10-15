# ColorPicker

A color picker in the style of Google Calendar. The trigger opens a dropdown with a grid of preset colors. Choosing a swatch closes the dropdown and calls `onChange`. The "+" button opens the "Choose custom color" dialog with a saturation and brightness area, a hue bar, a HEX field, a preview with automatically adjusted text color and, in Chromium browsers, an eye dropper. Save calls `onChange` and closes the dialog. Cancel discards the draft.

```tsx
import { ColorPicker } from "@components/ColorPicker";

const [color, setColor] = useState("#d81b60");

<ColorPicker value={color} onChange={setColor} />;
```

With a custom trigger:

```tsx
<ColorPicker value={color} onChange={setColor}>
  <Button variant="clear" icon={<More />} aria-label="Calendar options" />
</ColorPicker>
```

## Props

| Prop        | Type                         | Default                | Description                                                                                                                           |
| ----------- | ---------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `value`     | `string`                     | `undefined`            | Current color in HEX (`#abc` or `#aabbcc`, any case). A color missing from `presets` is shown as an extra selected swatch before "+". |
| `onChange`  | `(color: string) => void`    | Required               | Called with the chosen color as lowercase `#rrggbb`, from a preset or from Save.                                                      |
| `presets`   | `ColorPickerPreset[]`        | `COLOR_PICKER_PRESETS` | Preset colors. Invalid HEX values are skipped.                                                                                        |
| `columns`   | `number`                     | `6`                    | Number of grid columns.                                                                                                               |
| `disabled`  | `boolean`                    | `false`                | Disables the default trigger and prevents opening.                                                                                    |
| `placement` | `Placement` (Floating UI)    | `"bottom-start"`       | Dropdown placement.                                                                                                                   |
| `zIndex`    | `number`                     | `undefined`            | Dropdown z-index.                                                                                                                     |
| `labels`    | `Partial<ColorPickerLabels>` | English texts          | Texts and accessible names. Missing keys use the defaults.                                                                            |
| `children`  | `ReactElement`               | Round outline button   | Custom trigger. It must accept a `ref` and click handlers, like `Button`.                                                             |

### ColorPickerPreset

| Field   | Type     | Description                                |
| ------- | -------- | ------------------------------------------ |
| `value` | `string` | HEX color.                                 |
| `label` | `string` | Accessible name and tooltip of the swatch. |

`COLOR_PICKER_PRESETS` is exported: 24 colors in a 6 × 4 grid, as in Google Calendar.

### ColorPickerLabels

| Key                 | Default                                                                       |
| ------------------- | ----------------------------------------------------------------------------- |
| `trigger`           | `"Choose color"`                                                              |
| `palette`           | `"Colors"`                                                                    |
| `addCustom`         | `"Add custom color"`                                                          |
| `customTitle`       | `"Choose custom color"`                                                       |
| `customDescription` | `"Choose a background color. The text color will be adjusted automatically."` |
| `preview`           | `"A"`                                                                         |
| `hex`               | `"Hex"`                                                                       |
| `eyeDropper`        | `"Pick a color from the screen"`                                              |
| `saturation`        | `"Saturation and brightness"`                                                 |
| `hue`               | `"Hue"`                                                                       |
| `cancel`            | `"Cancel"`                                                                    |
| `save`              | `"Save"`                                                                      |

## Behavior notes

- The component is controlled: it does not keep the chosen color, pass it back through `value`.
- Without `value`, the default trigger shows the "no color" icon (`assets/none.png`). The build copies it next to the compiled styles.
- When the dropdown opens, focus moves to the selected swatch, or to the first item ("+" when there are no colors). Arrow keys move across the grid, Home and End go to the first and the last item, Escape closes the dropdown.
- Tab and Shift+Tab close the dropdown and continue from the trigger. This also works inside a `Modal`: the dropdown is portaled outside the modal, so focus leaves it through the trigger.
- After a choice, Escape or "+", focus returns to the trigger. When the dialog closes, focus returns to the trigger as well.
- The dialog starts from `value`, or from the first preset when there is no value. The draft is kept in HSV, so dragging brightness to black or entering grey does not reset the hue.
- HEX field: a full `#rrggbb` applies while typing, a short `#abc` applies on blur or Enter (focus stays in the field), invalid input is marked as an error and reverts on blur.
- Saturation area: arrow keys change saturation and brightness by 1, with Shift by 10. Hue bar: arrow keys change by 1°, with Shift by 10°, Home and End go to the ends.
- The eye dropper uses the EyeDropper API and is shown only where it is supported (Chromium browsers).
- The preview letter and the swatch check mark switch between light and dark by WCAG contrast. Light swatches get an outline.
