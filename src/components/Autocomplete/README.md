# Autocomplete

Autocomplete is a text input with a listbox popup for filtering and selecting options.
It supports controlled and uncontrolled values, controlled popup visibility, custom filtering, custom option rendering, loading and empty states, disabled options, and keyboard navigation with Arrow Up, Arrow Down, Home, End, Enter, Escape, and Tab.

```tsx
import React, { useState } from "react";
import { Autocomplete } from "@colibri/ui";

const cities = [
  { value: "london", label: "London" },
  { value: "paris", label: "Paris" },
];

export const Example = () => {
  const [query, setQuery] = useState("");

  return (
    <Autocomplete
      label="City"
      value={query}
      onValueChange={setQuery}
      options={cities}
      onOptionSelect={(option) => console.log(option.value)}
      placeholder="Start typing"
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `AutocompleteOption[]` | Required | Options shown in the listbox. |
| `value` | `string` | - | Controlled input value. |
| `defaultValue` | `string` | `""` | Initial value for uncontrolled usage. |
| `onValueChange` | `(value: string) => void` | - | Called when the input value changes. |
| `onOptionSelect` | `(option: T) => void` | - | Called when an option is selected. |
| `filterOption` | `(option: T, query: string) => boolean` | Case-insensitive label match | Custom option filter. |
| `renderOption` | `(option: T, state: AutocompleteOptionState) => ReactNode` | - | Custom option renderer. |
| `getOptionKey` | `(option: T) => string` | `option.value` | Returns the React key for an option. |
| `minQueryLength` | `number` | `0` | Minimum query length before options are shown. |
| `open` | `boolean` | - | Controlled popup visibility. |
| `defaultOpen` | `boolean` | `false` | Initial popup visibility for uncontrolled usage. |
| `onOpenChange` | `(open: boolean) => void` | - | Called when popup visibility changes. |
| `openOnFocus` | `boolean` | `true` | Opens the popup when the input receives focus. |
| `loading` | `boolean` | `false` | Shows the loading state instead of options. |
| `loadingText` | `ReactNode` | `"Loading..."` | Content shown while loading. |
| `emptyText` | `ReactNode` | `"No results found"` | Content shown when no options match. |
| `label` | `ReactNode` | - | Input label inherited from `Input`. |
| `hint` | `ReactNode` | - | Helper text inherited from `Input`. |
| `hasError` | `boolean` | - | Applies the error state inherited from `Input`. |
| `success` | `boolean` | - | Applies the success border state. |
| `clearable` | `boolean` | `true` | Shows the clear button when the value is not empty. |
| `clearLabel` | `string` | `"Clear value"` | Accessible label for the clear button. |
| `size` | `"s"`, `"m"`, or `"l"` | `"m"` | Input size. |
| `listMaxHeight` | `CSSProperties["maxHeight"]` | `var(--component-autocomplete-list-max-height)` | Maximum height of the option list. |
| `containerClassName` | `string` | - | Class name for the outer autocomplete wrapper. |
| `className` | `string` | - | Class name passed to the underlying `Input` field. |
| `disabled` | `boolean` | - | Disables the input and popup. |
| `readOnly` | `boolean` | - | Makes the input read-only and prevents the popup from opening. |
| `required` | `boolean` | - | Marks the field as required. |
| Input HTML props | `InputProps` | - | Other supported input attributes are passed to the library `Input`. |

## Option Shape

```ts
interface AutocompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
}
```
