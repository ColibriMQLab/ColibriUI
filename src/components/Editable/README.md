# Editable

A standalone editable single-line text component. To move it to another project, copy the whole folder. The runtime component only depends on `react`; the story additionally requires `@storybook/react-webpack5`, and the styles require Sass and CSS Modules support.

```tsx
const [title, setTitle] = useState('Document 1');

<Editable
    value={title}
    name="title"
    placeholder="Document title"
    maxLength={40}
    onChange={(_, value) => setTitle(value)}
/>
```

Colors can be overridden with CSS variables: `--editable-background`, `--editable-icon-color`, `--editable-icon-hover-color`, `--editable-placeholder-color`, and `--editable-caret-color`.
