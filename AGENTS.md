# AGENTS.md

Guidance for AI coding agents working in this repository.

## Repository

ColibriUI is a React and TypeScript component library.

- `src/components/` contains public UI components, base primitives, icons, theme tokens, hooks, and helpers.
- `scripts/` contains package build helpers.
- `.storybook/` configures Storybook with Webpack 5.
- `skills/` contains small repository-specific instructions. Read the relevant skill before a matching task.

Useful skills:

- `components` for creating, moving, or refactoring React components.
- `typescript` for public prop types, generics, type errors, and exported type APIs.
- `code-review` for reviews, architecture/dependency audits, and behavior-preserving refactors.
- `js-conventions` for local formatting and code style.

## Scope and Existing Changes

- Follow the user's requested scope. A review is read-only unless fixes are explicitly requested.
- Before work, inspect staged, unstaged, and untracked changes. Preserve unrelated user changes.
- Read-only requests also cover configuration, lockfiles, generated output, and local indexes. Do not run autofix, install dependencies, or generate builds in the workspace during a read-only review.
- If a review needs additional tests or generated artifacts, use an isolated temporary copy and report the verification limits.
- Keep behavior-preserving refactors compatible with public props, exports, DOM/style contracts, callbacks, and lifecycle behavior. Report unrelated existing defects separately.

## CodeGraph

When a `.codegraph/` index exists, use `codegraph_explore` through MCP, or `yarn codegraph explore`, before searching or reading code to locate symbols, understand behavior, or discover impact. Name a file or symbol to get its line-numbered source and call paths. Use raw file reads for unindexed content or files reported as stale.
CodeGraph stores a local project index in `.codegraph/`; it is gitignored and must not be committed.

Keep an existing graph fresh during implementation work:

```bash
yarn codegraph status
yarn codegraph sync
```

Use it for structure, symbol, and impact discovery:

```bash
yarn codegraph explore "Slider props and callers"
yarn codegraph node Button
yarn codegraph callers Button
yarn codegraph impact Button -d 3
git diff --name-only | yarn codegraph affected --stdin -q
```

If the graph looks stale or broken, rebuild it:

```bash
yarn codegraph index
```

If `.codegraph/` does not exist, skip CodeGraph. Index initialization is the user's decision; do not create it automatically. During a read-only review, do not sync or rebuild the index; read affected files directly if the graph is stale.

## Dependency Cruiser

`.dependency-cruiser.mjs` is the source of truth for component dependency boundaries.
Run it after changing imports, component structure, or public barrels:

```bash
yarn lint:deps
```

The standard component shape is:

- `src/components/ComponentName/index.ts` or `index.tsx` is the public entry.
- `src/components/ComponentName/index.props.ts` contains exported component props and related public types.
- `src/components/ComponentName/README.md` documents the component when present.
- implementation files, styles, tests, stories, and private subcomponents stay inside the component folder.
- imports from another top-level component should use that component's public entry, not its private implementation files.

Allowed shared areas for components:

- `src/components/base/`
- `src/components/hooks/`
- `src/components/helpers/`
- `src/components/lib/` and `src/components/libs/`
- `src/components/Icons/`
- `src/components/Theme/`

`src/components/Theme/` is the main design source for components. Use Theme tokens as much as possible for colors, spacing, sizing, radii, typography, and geometry. Do not use raw pixel values in component styles; prefer existing `rem` tokens or the closest matching Theme value. Do not edit base theme tokens, especially `src/components/Theme/colors`, unless Sergey explicitly asks for that token change.

## Component API Rules

- Prefer named exports for components and icons. Do not add new component `export default`.
- Export public props from `index.props.ts`.
- Re-export public components and public types from `src/components/index.ts`.
- Do not extend `src/components/Theme` tokens unless the task explicitly requires a missing design token.
- Do not edit base theme tokens, especially `src/components/Theme/colors`, unless Sergey explicitly asks for that token change.
- Prefer existing theme tokens for colors, spacing, sizing, borders, and typography.
- Use internal primitives such as `Input`, `BaseInput`, `FormField`, `InputRoot`, `Button`, `Typography`, and icons before adding custom UI machinery.

## Commands

Use Yarn for dependency and script management. Do not add `package-lock.json`.

```bash
yarn install
yarn lint
yarn lint:deps
yarn test
yarn audit:dead-code
yarn build
yarn build-storybook
yarn audit:package
./verify.sh
```

`verify.sh` runs:

```bash
yarn lint
yarn lint:deps
yarn test
yarn audit:dead-code
```

Run `./verify.sh` after runtime code, dependency, build-tooling, or config changes. For docs-only or stories-only changes, run the narrower relevant command and say what was skipped.

Run `yarn build` for public type or package/build pipeline changes, and `yarn build-storybook` for story changes. `yarn audit:package` checks the built package in `dist/`. A source TypeScript check does not validate emitted declarations or package compatibility.

For read-only reviews, choose checks that respect the scope above and use an isolated copy when builds are needed. Report actual commands, failures, warnings, and skipped checks. Treat dead-code reports as advisory: absence of local callers does not prove a public export is unused.

## Testing

- Tests use Jest and Testing Library.
- Test behavior, not implementation details.
- Add focused tests when a component behavior, keyboard interaction, formatting rule, or accessibility contract changes.
- Storybook stories should cover public props and interactive actions for component APIs.
- For overlays and focus changes, cover initial focus, Tab/Shift+Tab, Escape, restoration after close (including `autoFocus`), nested instances, rerenders, and cleanup where relevant.
- Use real-browser evidence for focus visibility, visual layout, themes, and interactions that jsdom cannot establish. Passing Jest, axe, or a Storybook build alone does not prove browser accessibility.
- Component README and Storybook content remain English; write reports in the user's language.

## TypeScript

Use `skills/typescript/SKILL.md` for TypeScript rules and public prop API guidance.

## Do Not Modify

Unless explicitly asked:

- generated output in `dist/`
- generated output in `storybook-static/`
- dependency lockfiles except when dependency versions change

Do not commit local indexes or caches such as `.codegraph/`.
