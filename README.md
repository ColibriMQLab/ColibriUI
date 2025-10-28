# Colibri UI

![npm version](https://img.shields.io/npm/v/colibri-ui.svg?style=flat)

React UI components library.

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
import "colibri-ui/theme_default_variables.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx("theme")}>
        {children}
      </body>
    </html>
  );
}
```

## License

MIT