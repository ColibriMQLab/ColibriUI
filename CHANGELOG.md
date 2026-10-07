# Changelog

## Unreleased

### Added

- `Drawer` and `Sheet` take `onClosed`: called once the closing animation has finished and the panel with its content is removed.
- `Typography` `size` takes sizes per breakpoint, mobile first: `size={{ base: "xs", sm: "m" }}` is `xs` below `sm` (40rem) and `m` from it. `base` applies to every width, a breakpoint from its width up (`BREAKPOINTS`); any size name works at any breakpoint, and the sizes' own mobile steps (`h1`…`h5`, `display-*`) still apply inside them. A breakpoint size replaces the previous one completely: weight and letter spacing it does not set come from the parent, not from the smaller size; an explicit `fontWeight` still wins. A plain string works as before. Type `TypographyResponsiveSize`.

- `Typography` takes `lines`: the text is limited to that many lines and the last one ends with an ellipsis.
- Theme tokens `font-size-h{1…5}-mobile` and `line-height-h{1…5}-mobile`.
- `Typography` sizes `display-s`, `display-m` and `display-l` for hero headings above `h1`: 56/64, 72/80 and 88/96 px (font size / line height), and 40/48, 48/56 and 56/64 px below `md` (48rem). They use their own tokens `font-size-display-{s,m,l}`, `line-height-display-{s,m,l}` and the `-mobile` pairs; `display-sm`…`display-xl` and their tokens do not change.

### Changed

- `Typography` sizes `h1`…`h5` get smaller below `md` (48rem): 32/40, 28/36, 24/32, 20/28 and 18/26 px (font size / line height). From 48rem up they stay the same. `h6` and `xs`/`s`/`m`/`l` do not change.
- `Typography` sets the font family by size: `xs`/`s`/`m`/`l` and `text-*` use `--font-family-body`; `h1`…`h6`, `heading-*` and `display-*` use `--font-family-display`. Without `size` the font is inherited, as before.

### Fixed

- `Input` and `TextArea` with `disabled` now disable the native `<input>` / `<textarea>`. Before, `disabled` only styled the field and covered it with a click-blocking layer: the field was still reachable with Tab, editable from the keyboard and announced as enabled by screen readers.

## 0.8.82

### Fixed

- A modal `Sheet` now joins the same stack as `Modal` while it is open, so only the topmost layer reacts to Escape and Tab. Before, a `Sheet` opened over a `Modal` closed both on Escape, and the `Modal` focus trap pulled Tab focus out of the `Sheet`. A non-modal `Sheet` does not join the stack and leaves Escape to an open `Modal`.
- `Modal` and `Sheet` ignore an Escape that another layer already handled (`event.defaultPrevented`), and `Modal` now calls `preventDefault()` on the Escape that closes it.

## 1.0.0 (unreleased)

Release this as a major version: the breakpoint change below is breaking.

### Breaking changes

Breakpoints now use one fixed set of values in `rem`, the same as the Tailwind CSS defaults (Tailwind is not a dependency). See the "Breakpoints" section in the README.

| Name  | Value   | px   |
| ----- | ------- | ---- |
| `sm`  | `40rem` | 640  |
| `md`  | `48rem` | 768  |
| `lg`  | `64rem` | 1024 |
| `xl`  | `80rem` | 1280 |
| `2xl` | `96rem` | 1536 |

- Removed `xs` (320px) and `hd` (2560px).
- Changed the values of `sm`, `md`, `lg` and `xl`; added `2xl`.
- The default export `Breakpoints` from `Theme/breakpoints` (with `values`, `up`, `under`, `between`) is replaced by `BREAKPOINTS` and `media`.
- `under` is renamed to `down`.
- `media.*` returns a bare range query, for example `(width >= 48rem)`, without the `@media ` prefix and without the `isMedia` argument. `between` takes two arguments instead of a tuple.
- Queries use range syntax: `up` is `(width >= X)` instead of `(min-width: Xpx)`; `down` is `(width < X)` instead of `(max-width: X - 1px)`.
- `useMediaSizes` passes `media` to a callback instead of the old `Breakpoints` object.
- `Modal` switches between the mobile and desktop layouts at `lg` (1024px) instead of 1075px.

### ⚠️ Same names, different sizes: no type error

`sm`, `md`, `lg` and `xl` still exist, so code like `bp.up("md")` keeps compiling, but the edge moves silently. Map by value, not by name:

| Old call      | Old edge | Same call now   | Use instead  | New edge |
| ------------- | -------- | --------------- | ------------ | -------- |
| `up("sm")`    | 680px    | 640px (−40px)   | `up("sm")`   | 640px    |
| `up("md")`    | 1075px   | 768px (−307px)  | `up("lg")`   | 1024px   |
| `up("lg")`    | 1450px   | 1024px (−426px) | `up("xl")`   | 1280px   |
| `up("xl")`    | 1920px   | 1280px (−640px) | `up("2xl")`  | 1536px   |
| `under("md")` | < 1075px | —               | `down("lg")` | < 1024px |

The same mapping applies to `down` / `between` and to `useMediaSizes` callbacks.

### Changed

- `useMediaSizes` is built on `useSyncExternalStore`. It returns `false` on the server and during hydration and the real value right after, so the first client render matches the server render. It subscribes to `matchMedia` once per query instead of on every render.

### Fixed

- The ESM build did not emit the public entries' `index.js` correctly: `esm/Theme/index.js` exported only `THEMES` (not `BREAKPOINTS` / `media`), and 13 entries (`Autocomplete`, `Calendar`, `Card`, `CodeField`, `Drawer`, `Dropzone`, `Editable`, `Icons`, `List`, `NumberInput`, `Progress`, `Rating`, `Slider`) had no `esm/<Entry>/index.js` at all, so `colibri-ui/<Entry>` failed in bundlers that use the `module` field. Every public entry is now a Rollup input, and `yarn build` checks the built CJS and ESM entries against their `.d.ts`.

### Added

- `BREAKPOINTS`, `media` and the `BreakpointName` and `Media` types are exported from the package root and from `colibri-ui/Theme`.
- A stylelint rule and a test reject `min-width` / `max-width` and width values outside the table in the kit CSS.

### Migration

| Old                                                      | New                                               |
| -------------------------------------------------------- | ------------------------------------------------- |
| `import Breakpoints from "colibri-ui/Theme/breakpoints"` | `import { BREAKPOINTS, media } from "colibri-ui"` |
| `Breakpoints.values.xs` (320)                            | removed: base styles, below `sm`                  |
| `Breakpoints.values.sm` (680)                            | `BREAKPOINTS.sm` (40rem, 640px)                   |
| `Breakpoints.values.md` (1075)                           | `BREAKPOINTS.lg` (64rem, 1024px)                  |
| `Breakpoints.values.lg` (1450)                           | `BREAKPOINTS.xl` (80rem, 1280px)                  |
| `Breakpoints.values.xl` (1920)                           | `BREAKPOINTS["2xl"]` (96rem, 1536px)              |
| `Breakpoints.values.hd` (2560)                           | removed: use `2xl`                                |
| `Breakpoints.up("md")`                                   | `` `@media ${media.up("lg")}` ``                  |
| `Breakpoints.up("md", false)`                            | `media.up("lg")`                                  |
| `Breakpoints.under("md")`                                | `` `@media ${media.down("lg")}` ``                |
| `Breakpoints.between(["sm", "md"])`                      | `` `@media ${media.between("sm", "lg")}` ``       |
| `useMediaSizes((bp) => bp.up("md"))`                     | `useMediaSizes((bp) => bp.up("lg"))`              |
| `@media (min-width: 1075px)`                             | `@media (width >= 64rem)`                         |
| `@media (max-width: 1074px)`                             | `@media (width < 64rem)`                          |

The old names no longer match the old sizes: old `md` (1075px) is closest to new `lg`, not new `md` (768px). Map by value, not by name.
