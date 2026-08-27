---
name: code-review
description: Review ColibriUI component-library changes for bugs, regressions, API risk, dependency-boundary drift, weak TypeScript types, accessibility issues, and missing tests.
---

# Code Review

Review as a risk audit, not a style pass.

## Required Context

Before reviewing broad changes, read:

- `AGENTS.md`
- `skills/components/SKILL.md`
- `skills/typescript/SKILL.md`

Use CodeGraph first when `.codegraph/` exists and the review needs symbol, caller, or impact discovery.

## Checklist

- Public component API remains intentional and documented.
- Props exported from `index.props.ts` match implementation and stories.
- `src/components/index.ts` exports the intended public surface.
- No new component default exports.
- Cross-component imports use public entries where possible.
- Accessibility attributes, labels, focus behavior, keyboard behavior, and disabled/read-only states are preserved.
- Controlled and uncontrolled value flows are stable.
- Theme tokens are used instead of copied raw design values.
- Tests or stories cover changed behavior and important variants.
- Dependency boundaries pass `yarn lint:deps`.

## Output

Lead with findings ordered by severity and include file/line references.
If there are no findings, say that clearly and list residual risk plus commands run.
