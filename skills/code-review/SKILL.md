---
name: code-review
description: Review, audit, or behavior-preservingly refactor ColibriUI TypeScript and React code for contract violations, regressions, unsafe lifecycle and async behavior, API compatibility, accessibility, dependency boundaries, algorithms, and missing evidence.
---

# Code Review

Review as a production risk audit. Find concrete defects and justified improvements, with evidence a maintainer can verify. Consumers outside this repository may rely on public behavior; absence of local callers does not prove an API is unused.

Prioritize correctness, compatibility, API stability and operational safety before simplicity, maintainability, readability, extensibility or architectural elegance. Treat performance as a correctness concern when it threatens availability or responsiveness; otherwise require evidence that the path matters.

## Scope and Modes

- **Review:** inspect and report; do not modify project files unless the user requests fixes.
- **Refactor:** make only authorized implementation improvements, preserving observable behavior except for explicitly requested changes.
- **Architecture or dependency audit:** evaluate ownership, boundaries, algorithms, reuse and dependencies within the requested scope. Distinguish candidates from proven improvements; do not turn an audit into a rewrite.

User instructions and existing authorization take precedence. Read-only requests such as “сам ничего не правь” apply to source, configuration, lockfiles and generated artifacts. Choose checks that respect that scope; do not install, update dependencies, generate builds or run autofix merely to review. Preserve unrelated worktree changes.

## Establish Context

1. Read `AGENTS.md`, the request and the actual diff or requested files. Record the review scope and baseline; compare old and new behavior for changed code.
2. For component or public type changes, read `skills/components/SKILL.md` and `skills/typescript/SKILL.md`. Read other local guidance only when relevant.
3. When `.codegraph/` exists, use CodeGraph before broad searches to locate symbols, callers and impact. Verify claims against current source. Do not initialize an absent index during review.
4. Trace affected props, values, state, callbacks, refs, errors and side effects through callers, callees, adapters, tests and stories. Follow the changed contract beyond the diff until its consumers and failure paths are understood.
5. Identify sources of truth: public entries, prop types, themes, generation scripts and dependency boundary configuration. Do not mistake generated output or mocks for the authoritative implementation.

Derive contracts from the request, types, docs, tests, implementation and repository rules. Names suggest intent but are not proof. Explain conflicts between promised and actual behavior. Separate essential domain complexity from incidental implementation complexity before proposing removal.

## Observable Behavior and Public API

For a behavior-preserving refactor, account for these invariants wherever relevant:

- Export names and import paths; public props, overloads, generic inference, required versus optional inputs, accepted runtime values, return types and object shapes.
- Defaults, empty inputs, `0`, `false`, empty strings, `null` and `undefined`; parsing, normalization, serialization, filtering, duplicate handling and iteration order.
- Mutation of caller-owned data, object identity and reference equality, ref forwarding, DOM structure or CSS/class contracts used by consumers.
- Callback count, arguments and ordering; synchronous versus asynchronous execution; observable side effects, events, logging and telemetry.
- Which inputs fail, synchronous throw versus rejection, error class, externally relevant message and cause, partial work before failure.
- Cancellation, retries, caching, concurrent updates, cleanup and relevant timing.

Assume an export is public until repository evidence establishes otherwise. Stronger types must not silently reject previously accepted inputs or worsen inference. Types do not replace runtime validation for JavaScript or external input.

Report pre-existing bugs separately from introduced regressions. In a refactor, label unrelated bugs **Existing bug — not changed** and leave them unchanged unless their fix is authorized. Do not treat preserving a bug as a requirement when the user explicitly asks to fix it.

If a proposed improvement requires an API change outside scope, report the exact before/after contract, affected consumers, compatibility adapter or deprecation option, and migration cost. Do not silently implement the break.

## Correctness and Lifecycle Gates

Address each relevant gate before giving a verdict. A missing check is a limitation, not proof of a defect; name the evidence needed to resolve it.

### Contract and Impact

Identify the promised behavior and how the implementation reaches it. Trace each new prop, option, mode or branch through defaults, consumers, unsupported combinations, docs and tests. Check that visible UI state, callbacks and underlying data stay consistent.

### Lifecycle and Resources

Review behavior across render, SSR/hydration, mount, updates and unmount when applicable. Verify ownership and cleanup for listeners, timers, observers, subscriptions, animation frames, portals, body scroll locks and temporary global state. Check reopening, rapid toggles, nested instances and multiple simultaneous instances where relevant.

### Async and State Integrity

Trace start, cancellation, retry, resolution, rejection, stale-result handling and cleanup. Look for stale closures, out-of-order completion, duplicate actions, updates after unmount and conflicting sources of state. Check controlled/uncontrolled transitions, prop synchronization, derived state and optimistic rollback where used.

Do not replace sequential operations with parallel operations, move `await`, or change callback/microtask ordering without proving equivalent completion, failure, cancellation and partial side effects.

### Failure Paths

Inspect relevant empty, malformed, loading, disabled, read-only, error, retry and concurrent interaction cases. Follow the entire interaction, such as initialize → edit → validate → submit → error/success → reset, rather than checking only the successful render.

### Security and Trust Boundaries

When touched, check untrusted HTML/URLs, external input validation, sensitive logging and browser/server boundaries. For application integrations, establish their actual data-access and authorization rules from repository evidence; do not invent database, tenant or auth-context conventions for this component library.

## ColibriUI Contracts

Apply these checks when their surface changes:

- Public components use named exports, public props and related types live in `index.props.ts`, and intended APIs are re-exported through `src/components/index.ts` and component public entries.
- Cross-component imports use public entries. Check dependency direction against `.dependency-cruiser.mjs`; reuse internal primitives where they fulfill the same contract.
- Component styles use Theme tokens. Do not edit base tokens without authorization. Any added component token must exist in both Buenos Aires and Jaipur, with valid references and intentional theme-specific values.
- Inspect accessible names and descriptions, semantic elements, focus visibility, keyboard activation, disabled/read-only behavior and native form attributes. Accessibility is a correctness contract, not a cosmetic check.
- For overlays, trace opening focus, Tab/Shift+Tab, Escape, overlay clicks, focus restoration, containment, portal theme inheritance, scroll locking and nested behavior as applicable.
- Preserve public styles, relevant DOM semantics, event propagation and ref behavior. A visually identical screenshot does not establish interaction equivalence.
- Stories should demonstrate meaningful states and actions using library primitives. Component README and Storybook content remain English; communicate the review in the user's language.
- Check runtime imports and public types in both CJS and ESM, component subpaths, CSS output, theme variable generation, SSR safety, browser targets and React peer compatibility when build or dependency behavior changes.

## Targeted Expansions

Expand only where the requested change creates a relevant risk:

| Trigger                            | Additional evidence to inspect                                                                                                                           |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Date, time, number or locale logic | Parsing versus formatting, invalid input, local versus UTC behavior, DST, boundary values, range inclusivity, ordering and precision.                    |
| Collection or algorithm change     | Time/space complexity, allocations, actual input sizes, duplicate handling, stable order, equality semantics and caller-owned mutation.                  |
| Dependency removal or replacement  | Runtime imports, config/plugin strings, scripts, peers, declarations, side-effect registration and dynamic loading; compatibility and replacement cost.  |
| Build/package change               | Source-to-output generation, export/type agreement, externals, tree shaking, CSS side effects, package checks and consumers' import paths.               |
| Test or story change               | Whether removing or disconnecting the behavior would fail the test; mocks hiding integration, weakened assertions and snapshots hiding contract changes. |
| Shared abstraction                 | Whether implementations share inputs, defaults, errors, ordering and lifecycle, rather than only similar text.                                           |

## Refactor and Architecture Decisions

Prefer small, independently reviewable changes with one concrete purpose, a clear equivalence argument and an easy rollback. Delete unnecessary machinery before introducing abstractions. Reduce total reasoning cost, not just line count.

Classify duplication as identical, accidentally similar or intentionally different. Consolidate identical contracts; preserve deliberate differences or share only a presentational shell. Introduce a pattern only when it solves a demonstrated ownership, branching or extension problem better than ordinary functions and composition. Explain both the benefit and added complexity; do not choose from a pattern catalogue by resemblance.

For algorithms, inspect repeated scans, hidden nested loops, redundant sorting, parsing and allocations on meaningful paths. Before using a `Map`, `Set`, memoization or shared object, check equality, duplicates, iteration order, invalidation, identity and mutation. Do not trade clarity or compatibility for theoretical Big-O gains. Distinguish measured performance improvements from estimates.

Treat dead-code tools as advisory. No local callers is insufficient for public exports, string lookups, framework conventions, registration side effects or plugin configuration. Likewise, an installed transitive copy is not proof a directly used dependency can be removed.

Classify material refactor proposals independently of finding severity:

- **SAFE:** equivalence is locally demonstrable from the inspected contract and code.
- **SAFE WITH TESTS:** a focused characterization or regression test is needed before implementation.
- **RISKY:** ordering, identity, concurrency or undocumented consumers make compatibility subtle; explain the unresolved risk.
- **DO NOT CHANGE YET:** insufficient evidence to justify the change; state what would change the decision.

## Evidence and Validation

Use existing tests and the smallest meaningful additional proof. Characterization tests capture old edge behavior before refactoring; regression tests show a fix fails on the old implementation. Do not weaken tests to accommodate a refactor unless the old assertion is demonstrably wrong.

Choose checks proportional to the change and authorization:

- Runtime, dependency, build or configuration edits: run `./verify.sh` as required by repository guidance.
- Public types or build pipeline: run `yarn build`; build claims must concern the emitted package, not only source type checking.
- Imports, component structure or public barrels: run `yarn lint:deps`.
- Story changes: run `yarn build-storybook`; stories are excluded from normal lint.
- Package compatibility: use `yarn audit:package` against the intended build when authorized.
- Actual overlay, focus, drag, geometry or visual behavior: use browser/integration evidence where needed. jsdom, axe and a successful Storybook build do not prove these interactions.
- Performance or bundle claims: provide representative measurements or mark the benefit as unmeasured.

Report commands actually run, their results, scope and limitations. Distinguish source defects from tool failures, pre-existing failures and unrelated worktree changes. Do not claim all behavior is preserved because lint and tests pass; identify which important invariants they cover and which remain unverified.

## Findings and Verdict

Lead with actionable findings, ordered by impact. Each finding should contain:

1. Severity and exact file/line location.
2. Concrete trigger or reproduction and the violated contract.
3. Expected versus actual behavior; for regressions, old versus new evidence.
4. User or consumer impact, and why it is reachable.
5. The smallest useful correction and the evidence/test that verifies it.

Use one severity scale consistently:

- **P0 — Blocker:** demonstrated catastrophic impact, such as a critical security exposure or widespread unusability. Do not assign from speculation.
- **P1 — Major:** reachable serious behavioral, compatibility, accessibility or release failure.
- **P2 — Moderate:** bounded correctness issue or concrete maintainability/performance cost.
- **P3 — Minor:** localized issue with practical benefit to fixing it. Omit stylistic preferences.

Separate demonstrated defects, plausible risks and missing evidence. Confidence is not severity. Deduplicate findings with the same cause, omit generic best-practice advice, and do not manufacture issues to fill a report.

For a review, follow findings with a concise verdict and validation limits. If none were found, say so and name the strongest evidence and remaining blind spots. Use **Approve**, **Request changes** or **Block** for a change review when appropriate; an architecture audit need not invent a merge verdict. Serious unresolved risks may justify withholding approval, but missing context does not automatically mean Block. State exactly what evidence could change the verdict.

For substantial refactor proposals, include the problem, preserved invariants, confidence class, smallest approach, relevant before/after snippets, equivalence argument, API impact and verification. Include complexity and patterns only when material. For completed small edits, summarize the change and validation instead of producing this entire template.

For a broad audit, group recommendations into **Implement now**, **After characterization tests**, **Do not change yet**, and **Existing bugs/risks**, omitting empty groups. Add an incremental plan only when useful, with benefit, compatibility risk, dependencies and review boundaries. Do not expand a narrow task into a full architecture report.
