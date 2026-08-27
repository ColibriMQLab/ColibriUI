---
name: components
description: Create, update, or refactor React components in ColibriUI.
---

# Components

Use this skill for work in `src/components`.

## Structure

- Each public component folder has an `index.ts` or `index.tsx` public entry.
- Each public component folder has `index.props.ts` for exported props and related public types.
- Keep private implementation-only types in the implementation file only when they are not part of the public API.
- Use named exports for components and icons.
- Re-export public components and public types from `src/components/index.ts`.
- Keep styles in CSS modules next to the component.
- Keep stories and tests next to the component they cover.

## Imports

- Prefer imports from another component's public entry, for example `../Input`.
- Do not import another component's private implementation file unless that subcomponent is intentionally public.
- Same-folder imports can be relative.
- Shared primitives live in `src/components/base`.
- Theme tokens live in `src/components/Theme`; use existing tokens before adding raw values.

## Theme Tokens

- `src/components/Theme/` is the main design source for component styles.
- Use Theme tokens as much as possible for colors, spacing, sizing, radii, typography, and geometry.
- Do not use raw pixel values in component styles.
- Prefer existing `rem` tokens or the closest matching Theme value when an exact token is missing.
- Do not extend Theme unless the task explicitly asks for a missing shared token.
- Do not edit base theme tokens, especially `src/components/Theme/colors`, unless Sergey explicitly asks for that token change.

## Component Implementation

- Prefer internal primitives: `Input`, `BaseInput`, `FormField`, `InputRoot`, `Button`, `Typography`, existing icons.
- Preserve existing DOM semantics and accessibility attributes.
- Keep controlled and uncontrolled behavior stable.
- Use `forwardRef` when the component wraps an interactive DOM element and consumers reasonably need the ref.
- Avoid layout shifts by giving fixed-format controls stable dimensions.
- Use CSS variables from Theme for colors, spacing, radii, typography, shadows, geometry, and component sizes.

## Stories

- Use `@storybook/react-webpack5` types.
- Cover all public props with `argTypes` when practical.
- Use `storybook/test` `fn()` for action props.
- Add focused examples for important states and variants.
- Stories are excluded from ESLint; verify story changes with Storybook when behavior or imports change.

## Documentation

- Component README files should be in English.
- Document all public props, variants, behavior notes, and short usage examples.
