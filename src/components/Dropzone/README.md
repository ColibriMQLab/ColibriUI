# Dropzone

A file picker and drag-and-drop target for uploads.

```tsx
<Dropzone
  title="Upload documents"
  description="Click or drag files here"
  accept=".pdf,image/*"
  multiple
  validator={async (files) => ({ acceptedFiles: files })}
  onDrop={({ acceptedFiles }) => upload(acceptedFiles)}
  onChoseFiles={({ acceptedFiles }) => upload(acceptedFiles)}
/>
```

`onDrop` runs after drag-and-drop, and `onChoseFiles` runs after the system file dialog. Both paths pass through the async `validator` before handlers are called.

The component supports controlled `files`, `disabled`, `stretch`, custom width and height, icon placement, a custom icon, and repeated selection of the same file.
