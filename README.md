# Colibri UI

![npm version](https://img.shields.io/npm/v/colibri-ui.svg?style=flat)
![tests](https://img.shields.io/badge/tests-42%20passed-brightgreen?style=flat)
![coverage statements](https://img.shields.io/badge/statements-80.27%25-yellowgreen?style=flat)
![coverage branches](https://img.shields.io/badge/branches-61.77%25-yellow?style=flat)
![coverage functions](https://img.shields.io/badge/functions-87.5%25-brightgreen?style=flat)
![coverage lines](https://img.shields.io/badge/lines-86.64%25-brightgreen?style=flat)

React UI components library.

Colibri UI is in active development. Use it at your own risk 😈

## Demo

[Demo](https://godfreyd.github.io/colibri-ui)

## Installation

```sh
npm i -S colibri-ui
```

## Usage

```tsx
// app/layout.tsx
import clsx from "clsx";
import type { ReactNode } from "react";
import "colibri-ui/theme_jaipur_variables.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx("theme")}>{children}</body>
    </html>
  );
}
```

## Theming

Colibri UI ships with two fully tokenized themes:

- `JAIPUR`: the default theme. Its main brand color is eggplant, with pink as the accent color.
- `BA`: the Buenos Aires theme. Its main brand color is forest, with lime as the accent color.

Each theme is exported in two forms:

- as a CSS variables file: `theme_jaipur_variables.css` or `theme_ba_variables.css`
- as a JavaScript token object through `THEMES`

### Use a Built-In Theme

Import the theme CSS once near the root of your app and add the `theme` class to the element that should receive the variables.

```tsx
import "colibri-ui/theme_jaipur_variables.css";

export function App({ children }: { children: React.ReactNode }) {
  return <div className="theme">{children}</div>;
}
```

To use the Buenos Aires theme instead:

```tsx
import "colibri-ui/theme_ba_variables.css";
```

### Override an Existing Theme

You can override any token after importing the built-in theme CSS. Keep the same token names and define your overrides on `.theme`, or on a more specific theme class.

```css
@import "colibri-ui/theme_jaipur_variables.css";

.theme {
  --color-bg-canvas: #fbfaf7;
  --color-text-primary: #20162f;
  --color-action-primary: #2c2242;
  --color-action-secondary: #ffa8cd;
  --component-button-primary-bg: var(--color-action-primary);
  --component-button-primary-text: var(--color-action-secondary);
}
```

For scoped overrides, add another class next to `theme`.

```tsx
<div className="theme theme-custom">{children}</div>
```

```css
.theme-custom {
  --color-focus-ring: #ffa8cd;
  --component-card-radius: 0.75rem;
}
```

### Create a Custom Theme

For a full custom theme, start from one of the built-in token objects and override the values you need. This keeps your custom theme compatible with every component token.

```tsx
import { THEMES } from "colibri-ui";

const myTheme = {
  ...THEMES.JAIPUR,
  "color-bg-canvas": "#faf8f2",
  "color-text-primary": "#1f1630",
  "color-action-primary": "#1f1630",
  "color-action-secondary": "#ff9fc8",
  "component-button-primary-bg": "#1f1630",
  "component-button-primary-text": "#ff9fc8",
};

Object.entries(myTheme).forEach(([token, value]) => {
  document.documentElement.style.setProperty(`--${token}`, value);
});
```

If you add a theme inside the library itself, create both layers:

- palette constants in `src/components/Theme/colors/theme_<name>.ts`
- theme tokens in `src/components/Theme/themes/<name>.ts`

Then export it from `src/components/Theme/index.tsx` and update `scripts/variables.ts` if you want a generated CSS variables file in the package build.

## Breakpoints

Colibri UI uses one fixed set of breakpoints, shared with the apps that use the kit.

| Name  | Value   | px   |
| ----- | ------- | ---- |
| `sm`  | `40rem` | 640  |
| `md`  | `48rem` | 768  |
| `lg`  | `64rem` | 1024 |
| `xl`  | `80rem` | 1280 |
| `2xl` | `96rem` | 1536 |

The values match the Tailwind CSS defaults on purpose, because they are an industry standard. Tailwind is not a dependency of Colibri UI.

Rules:

- **Mobile first.** Base styles are for screens narrower than `sm`. There is no `xs`.
- **rem, not px.** Layout follows the user's browser font size.
- **Range syntax only.** Write `(width >= 48rem)` and `(width < 48rem)`. Do not use `min-width` / `max-width` or `- 1px` arithmetic: each edge belongs to exactly one side.

### CSS

CSS cannot read variables inside media queries, so write the value as a literal:

```css
.card {
  padding: var(--space-4);
}

@media (width >= 64rem) {
  .card {
    padding: var(--space-6);
  }
}
```

Inside the kit, a test and a stylelint rule reject `min-width` / `max-width` and any width value outside the table.

### JavaScript

```ts
import { BREAKPOINTS, media, useMediaSizes } from "colibri-ui";

BREAKPOINTS.md; // "48rem"
media.up("md"); // "(width >= 48rem)"
media.down("md"); // "(width < 48rem)"
media.between("md", "lg"); // "(48rem <= width < 64rem)"

window.matchMedia(media.up("lg")).matches;

// in a component
const isDesktop = useMediaSizes((bp) => bp.up("lg"));

// CSS-in-JS: add the @media prefix yourself
const css = `@media ${media.down("sm")} { … }`;
```

`BREAKPOINTS` and `media` are also exported from `colibri-ui/Theme`.

### useMediaSizes

`useMediaSizes(query)` takes a query string or a function that receives `media`, and returns whether the query matches. It updates when the viewport crosses the edge.

Returns `false` on the server and during hydration. Use it to decide whether to mount a heavy component; to show/hide markup use CSS media queries, otherwise the wrong variant renders until hydration.

## License

MIT
