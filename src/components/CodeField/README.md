# CodeField

A standalone field for entering one-time codes. Copy the whole folder into a project with React, TypeScript, and CSS Modules. The runtime component only depends on `react`; `.scss` requires `sass`, and the story uses `@storybook/react-webpack5`.

```tsx
const [code, setCode] = useState("");

<CodeField
  value={code}
  onChange={setCode}
  onFullCodeEnter={(fullCode) => console.log(fullCode)}
  codeLength={6}
  placeholder="0"
  caption="Enter the code from the message"
/>;
```

Supported code lengths are 4, 5, and 6; sizes are `m`, `l`, and `xl`; shapes are `default` and `segmented`. The component supports paste, controlled and uncontrolled modes, symbol filtering, and error states. Appearance can be customized with CSS variables prefixed with `--code-field-`.
