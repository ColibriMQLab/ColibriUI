---
name: js-conventions
description: Apply local JavaScript and TypeScript style in ColibriUI.
---

# JavaScript And TypeScript Conventions

- Follow the repository ESLint, Stylelint, and Prettier configs.
- Use Yarn scripts from `package.json`.
- Prefer `const`; use `let` only when reassignment is needed.
- Avoid `any`, TypeScript suppression comments, shadowed names, unused values, and `console`.
- Keep imports in the order enforced by `eslint.config.mjs`: builtin/external, internal, parent, sibling, index, object, type.
- Use type-only imports when an import is used only as a type.
- Prefer concise arrow bodies when they stay readable.
- Keep functions small and named by purpose.
- Prefer existing helpers and component primitives over new local utilities.
- Preserve public exports and consumer-facing behavior unless the task asks for an API change.
- Run `yarn lint` after code changes and `./verify.sh` for broader runtime or config changes.
