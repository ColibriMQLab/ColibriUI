---
name: typescript
description: Work on ColibriUI TypeScript types, public prop APIs, generics, and compiler errors.
---

# TypeScript

Use this skill for TypeScript compiler errors, public prop APIs, generic component APIs,
utility types, type narrowing, callback signatures, and removing unsafe casts.

## Workflow

- Run the relevant TypeScript or build check before and after type-heavy changes.
- Prefer fixing the root type model over silencing errors with casts.
- Preserve runtime behavior while tightening types.
- Preserve useful inference for component consumers.
- Do not widen public APIs only to satisfy an internal implementation detail.

## Public Component APIs

- Keep public prop interfaces in `index.props.ts`.
- Export related public unions, callback value types, mode types, and size/variant types with the component.
- Use discriminated unions when props describe distinct modes, for example single vs range selection.
- Use `Omit`, `Pick`, `Partial`, `Required`, `ComponentProps`, and `Parameters` to inherit existing component APIs without duplicating them.
- Prefer inheriting from internal primitives such as `InputProps` when wrapping an existing primitive.
- Keep private implementation-only types in the implementation file.

## React Types

- Prefer precise React types over broad DOM or `any` types.
- Use `ReactNode` for renderable content and `ReactElement` only when element-specific behavior is required.
- Use `ComponentProps<typeof Component>` when stories or wrappers should track the component API.
- Use `MouseEventHandler`, `ChangeEventHandler`, `FocusEventHandler`, and similar handler types when they improve readability.
- Use `forwardRef<Element, Props>` for components that expose an underlying interactive element.
- Type callback payloads explicitly when they are part of the public API.

## Safe Narrowing

- Use `unknown` for untrusted or externally shaped values.
- Narrow with `typeof`, `instanceof`, `in`, equality checks, user-defined type guards, or discriminants.
- Prefer early returns after narrowing to keep branches readable.
- Avoid truthiness checks when `0`, `""`, or `false` are valid values.
- Use exhaustive checks for discriminated unions when adding modes or variants.

## Generics And Inference

- Put constraints on generic parameters, for example `<TValue extends string | number>`.
- Infer from values that callers pass instead of asking callers for explicit generic arguments.
- Keep generic order from most important/inferred to least important/defaulted.
- Use `as const` for local option lists when deriving literal unions.
- Use indexed access types such as `typeof sizes[number]` to derive unions from tuples.
- Use template literal types only when they model a real string contract.

## Casts

- Avoid casts unless the runtime invariant is clear and local.
- Prefer narrowing helpers over repeated `as` assertions.
- If a cast remains, keep it near the invariant that proves it.
- Never use `as any`; use a precise intermediate type or `unknown` with narrowing.

## Common Patterns

### Derive Unions From Options

```ts
const sizes = ["s", "m", "l"] as const;

export type Size = (typeof sizes)[number];
```

### Inherit A Primitive API

```ts
import type { InputProps } from "../Input/index.props";

export interface NumberInputProps
  extends Omit<InputProps, "type" | "value" | "defaultValue" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: NumberInputValue) => void;
}
```

### Distinct Modes

```ts
interface SingleProps {
  mode?: "single";
  value: number;
  onChange: (value: number) => void;
}

interface RangeProps {
  mode: "range";
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export type SliderProps = SingleProps | RangeProps;
```

### Type Guard

```ts
const isHTMLElement = (value: EventTarget | null): value is HTMLElement =>
  value instanceof HTMLElement;
```

## Validation

- Run `yarn build` for public type or declaration changes.
- Run `yarn lint` for TypeScript and lint-rule changes.
- Run `./verify.sh` for broader runtime, config, dependency, or public API changes.
