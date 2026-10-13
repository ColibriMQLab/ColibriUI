# Pagination

Page navigation with previous and next arrows, collapsed page ranges, an optional compact counter, a quick jump field, and a page size select. The page and the page size work controlled or uncontrolled.

```tsx
import { Pagination } from "@components/Pagination";

const [page, setPage] = useState(1);

<Pagination totalPages={24} page={page} onPageChange={setPage} />;
```

## Props

| Prop               | Type                         | Default           | Description                                               |
| ------------------ | ---------------------------- | ----------------- | --------------------------------------------------------- |
| `totalPages`       | `number`                     | —                 | Number of pages. Values below 1 count as 1.               |
| `page`             | `number`                     | —                 | Current page. Makes the page controlled.                  |
| `defaultPage`      | `number`                     | `1`               | Initial page in uncontrolled mode.                        |
| `onPageChange`     | `(page: number) => void`     | —                 | Called with the new page.                                 |
| `siblingCount`     | `number`                     | `1`               | Pages shown on each side of the current page.             |
| `boundaryCount`    | `number`                     | `1`               | Pages always shown at the start and at the end.           |
| `disabledPages`    | `readonly number[]`          | `[]`              | Pages that cannot be selected. Arrows skip them.          |
| `disabled`         | `boolean`                    | `false`           | Disables every control.                                   |
| `mode`             | `"default" \| "compact"`     | `"default"`       | `compact` replaces the page list with a `3 / 24` counter. |
| `size`             | `"s" \| "m" \| "l"`          | `"m"`             | Size of the page buttons and the action fields.           |
| `pageSize`         | `number`                     | —                 | Current page size. Makes the page size controlled.        |
| `defaultPageSize`  | `number`                     | `20`              | Initial page size in uncontrolled mode.                   |
| `pageSizeOptions`  | `readonly number[]`          | `[20, 50, 100]`   | Options of the page size select.                          |
| `onPageSizeChange` | `(pageSize: number) => void` | —                 | Called with the new page size.                            |
| `showPageSize`     | `boolean`                    | `false`           | Shows the page size select.                               |
| `showQuickJump`    | `boolean`                    | `false`           | Shows the quick jump field. It commits on Enter or blur.  |
| `helperText`       | `ReactNode`                  | —                 | Text next to the action fields.                           |
| `previousLabel`    | `string`                     | `"Previous page"` | Accessible name of the previous arrow.                    |
| `nextLabel`        | `string`                     | `"Next page"`     | Accessible name of the next arrow.                        |
| `pageLabel`        | `(page: number) => string`   | `` `Page ${n}` `` | Accessible name of a page button.                         |
| `quickJumpLabel`   | `ReactNode`                  | `"Go to page"`    | Label of the quick jump field.                            |
| `pageSizeLabel`    | `ReactNode`                  | `"Per page"`      | Label of the page size select.                            |

Other `nav` attributes, including `aria-label` (default `"Pagination"`), `className`, and `ref`, go to the root `nav` element.

## With actions

```tsx
<Pagination
  totalPages={48}
  page={page}
  onPageChange={setPage}
  pageSize={pageSize}
  onPageSizeChange={setPageSize}
  pageSizeOptions={[10, 20, 50, 100]}
  showQuickJump
  showPageSize
  helperText="960 items"
/>
```

The component does not reset the page when the page size changes. Recalculate `totalPages` and the page in `onPageSizeChange`.

## getPaginationItems

`getPaginationItems(totalPages, page, siblingCount?, boundaryCount?)` returns the visible items: page numbers plus `"start-ellipsis"` and `"end-ellipsis"`. Use it to build a custom pagination layout.

## Theme tokens

`--component-pagination-text`, `--component-pagination-text-current`, `--component-pagination-bg-current`, `--component-pagination-bg-hover`, `--component-pagination-focus-ring`.
