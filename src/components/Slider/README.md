# Slider

A controlled slider component for selecting a single numeric value or a numeric range. It supports horizontal and vertical layouts, reversed direction, steps, ticks, formatted values, disabled state, and configurable thumb visibility.

```tsx
import { Slider } from "@components/Slider";

<Slider
  mode="single"
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  ariaLabel="Volume"
/>;

<Slider
  mode="range"
  value={range}
  onChange={setRange}
  min={0}
  max={100}
  minDistance={10}
  ariaLabel={["Minimum price", "Maximum price"]}
/>;
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `"single" \| "range"` | `"single"` | Selects a single-value slider or a two-thumb range slider. |
| `value` | `number \| [number, number]` | Required | Current controlled value. Use a number for `single` mode and a tuple for `range` mode. |
| `onChange` | `(value) => void` | Required | Called while the value changes. |
| `onChangeCommitted` | `(value) => void` | `undefined` | Called when pointer or keyboard interaction is committed. |
| `min` | `number` | `0` | Minimum allowed value. |
| `max` | `number` | `100` | Maximum allowed value. |
| `step` | `number` | `1` | Value increment. Pointer values are snapped to this step. |
| `label` | `ReactNode` | `undefined` | Main label displayed near the slider. |
| `labelContent` | `ReactNode` | `undefined` | Additional content rendered before `label`, for example an icon. |
| `labelPlacement` | `"top" \| "left" \| "none"` | `"top"` | Controls where the label is rendered, or hides it. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Slider direction. |
| `reversed` | `boolean` | `false` | Reverses the visual direction of the value scale. |
| `disabled` | `boolean` | `false` | Disables interaction and applies disabled styling. |
| `size` | `"s" \| "m" \| "l"` | `"m"` | Controls label typography and slider length. |
| `view` | `"default" \| "accent" \| "gradient" \| string` | `"default"` | Visual style of the filled track. Custom strings can map to external CSS module classes. |
| `pointerSize` | `"small" \| "large" \| "none"` | `"small"` | Thumb size. Use `"none"` to hide thumbs. |
| `pointerVisibility` | `"always" \| "hover"` | `"always"` | Shows thumbs permanently or only on hover/focus. |
| `showValue` | `boolean` | `false` | Displays the current value next to the active thumb. |
| `valueFormatter` | `(value: number) => ReactNode` | `(value) => value` | Formats values displayed by `showValue`. |
| `ticks` | `Array<number \| { value: number; label?: ReactNode }>` | `[]` | Tick marks rendered along the track. Number ticks use the number as their label. |
| `tickType` | `"bullet" \| "separator"` | `"bullet"` | Tick marker style. |
| `ariaLabel` | `string \| [string, string]` | `undefined` | Accessible label for the hidden range input(s). Use a tuple in `range` mode. |
| `name` | `string \| [string, string]` | `undefined` | Form field name for the hidden range input(s). Use a tuple in `range` mode. |
| `minDistance` | `number` | `0` | Minimum distance between range thumbs. Only applies in `range` mode. |
| `className` | `string` | `undefined` | Additional class name for the root element. |

The component also accepts standard `HTMLDivElement` attributes, except `onChange` and `defaultValue`, which are owned by the controlled slider API.
