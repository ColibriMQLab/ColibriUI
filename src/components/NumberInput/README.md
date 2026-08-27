# NumberInput

A controlled or uncontrolled numeric input component built on top of the internal `Input` component. It stores the raw value as a numeric string with `.` as the internal decimal separator, while rendering a formatted value with configurable group separators, decimal separator, prefix, and suffix.

```tsx
import { NumberInput } from "@components/NumberInput";

const [value, setValue] = useState("125000.5");

<NumberInput
  label="Amount"
  value={value}
  onValueChange={({ value }) => setValue(value)}
  decimalSeparator=","
  thousandSeparator=" "
  decimalScale={2}
  fixedDecimalScale
  suffix=" EUR"
  hint="Formatted as currency"
/>;
```

## Value Shape

`onValueChange` receives a `NumberInputValues` object:

| Field            | Type                  | Description                                                                        |
| ---------------- | --------------------- | ---------------------------------------------------------------------------------- |
| `value`          | `string`              | Normalized raw numeric string. Decimals always use `.` internally.                 |
| `formattedValue` | `string`              | Display value with grouping, decimal separator, prefix, and suffix applied.        |
| `floatValue`     | `number \| undefined` | Parsed numeric value when the current input can be represented as a finite number. |

## Props

| Prop                  | Type                                      | Default      | Description                                                                        |
| --------------------- | ----------------------------------------- | ------------ | ---------------------------------------------------------------------------------- |
| `value`               | `string`                                  | `undefined`  | Controlled raw value.                                                              |
| `defaultValue`        | `string`                                  | `""`         | Initial raw value for uncontrolled usage.                                          |
| `onValueChange`       | `(values: NumberInputValues) => void`     | `undefined`  | Called when the normalized value changes.                                          |
| `thousandSeparator`   | `string \| false`                         | `" "`        | Group separator. Use `false` to disable grouping.                                  |
| `decimalSeparator`    | `string`                                  | `"."`        | Separator shown between integer and fractional parts.                              |
| `thousandsGroupStyle` | `"thousand" \| "lakh" \| "wan" \| "none"` | `"thousand"` | Integer grouping strategy.                                                         |
| `decimalScale`        | `number`                                  | `3`          | Maximum number of decimal digits. Use `0` for integer-only input.                  |
| `fixedDecimalScale`   | `boolean`                                 | `false`      | Pads the fractional part to `decimalScale` digits.                                 |
| `allowNegative`       | `boolean`                                 | `false`      | Allows a leading negative sign.                                                    |
| `allowLeadingZeros`   | `boolean`                                 | `false`      | Preserves leading zeroes in the integer part.                                      |
| `prefix`              | `string`                                  | `""`         | Text rendered before the formatted number.                                         |
| `suffix`              | `string`                                  | `""`         | Text rendered after the formatted number.                                          |
| `min`                 | `number`                                  | `undefined`  | Rejects changes below this value.                                                  |
| `max`                 | `number`                                  | `undefined`  | Rejects changes above this value.                                                  |
| `isAllowed`           | `(values: NumberInputValues) => boolean`  | `undefined`  | Custom validator. Return `false` to reject a change.                               |
| `clearable`           | `boolean`                                 | `false`      | Shows a clear button when the input has a value.                                   |
| `clearLabel`          | `string`                                  | `"Clear"`    | Accessible label for the clear button.                                             |
| `size`                | `"s" \| "m" \| "l"`                       | `"m"`        | Controls input height and typography.                                              |
| `label`               | `ReactNode`                               | `undefined`  | Inherited from `Input`. Label displayed above the input.                           |
| `hint`                | `ReactNode`                               | `undefined`  | Inherited from `Input`. Helper or error text displayed below the input.            |
| `hasError`            | `boolean`                                 | `false`      | Inherited from `Input`. Applies error styling.                                     |
| `variant`             | `"primary"`                               | `"primary"`  | Inherited from `Input`. Visual variant.                                            |
| `required`            | `boolean`                                 | `false`      | Inherited from `Input`. Marks the field as required.                               |
| `disabled`            | `boolean`                                 | `false`      | Inherited from `Input`. Disables the field.                                        |
| `readOnly`            | `boolean`                                 | `false`      | Inherited from `Input`. Makes the field read-only.                                 |
| `placeholder`         | `string`                                  | `undefined`  | Inherited input placeholder.                                                       |
| `name`                | `string`                                  | `undefined`  | Inherited input name.                                                              |
| `id`                  | `string`                                  | Generated    | Inherited input id.                                                                |
| `startIcon`           | `ReactNode`                               | `undefined`  | Inherited from `Input`. Icon rendered before the input.                            |
| `endIcon`             | `ReactNode`                               | `undefined`  | Inherited from `Input`. Icon rendered after the input and before the clear button. |
| `inputRef`            | `ForwardedRef<HTMLInputElement>`          | `undefined`  | Inherited from `Input`. Ref for the native input element.                          |
| `className`           | `string`                                  | `undefined`  | Inherited from `Input`. Additional class name for the field container.             |
| `onFocus`             | `(event) => void`                         | `undefined`  | Inherited focus handler.                                                           |
| `onBlur`              | `(event) => void`                         | `undefined`  | Inherited blur handler.                                                            |
| `onKeyDown`           | `(event) => void`                         | `undefined`  | Inherited keydown handler.                                                         |
| `onInput`             | `(event) => void`                         | `undefined`  | Inherited input handler.                                                           |

The component also accepts the standard input attributes supported by `Input`, except `type`, `inputMode`, `size`, `value`, `defaultValue`, `onChange`, `min`, `max`, and `prefix`, which are owned by the NumberInput API.
