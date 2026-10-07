/**
 * @jest-environment node
 */
import { join } from "path";
import postcss, { type AtRule, type Rule } from "postcss";
import { compile } from "sass";

const TYPOGRAPHIC_PROPERTIES = [
  "font-family",
  "font-size",
  "font-weight",
  "letter-spacing",
  "line-height",
];

const root = postcss.parse(
  compile(join(__dirname, "../Typography.module.scss")).css,
);

const getRules = (matches: (rule: Rule) => boolean) => {
  const rules: Rule[] = [];
  root.walkRules((rule) => {
    if (matches(rule)) rules.push(rule);
  });
  return rules;
};

const isBreakpointRule = (rule: Rule) =>
  /^\.size_(sm|md|lg|xl|2xl)_[\w-]+$/.test(rule.selector) &&
  rule.parent?.type === "atrule" &&
  /^\(width >= [\d.]+rem\)$/.test((rule.parent as AtRule).params);

describe("Typography styles", () => {
  const breakpointRules = getRules(isBreakpointRule);

  it("generates the breakpoint sizes", () => {
    expect(breakpointRules.length).toBeGreaterThan(0);
  });

  it.each(breakpointRules.map((rule) => [rule.selector, rule]))(
    "%s sets every typographic property, so no smaller size leaks into it",
    (_, rule) => {
      const properties = (rule as Rule).nodes
        .filter((node) => node.type === "decl")
        .map((node) => node.prop);

      expect(properties).toEqual(
        expect.arrayContaining(TYPOGRAPHIC_PROPERTIES),
      );
    },
  );

  it("keeps an explicit fontWeight above every size", () => {
    const lastSizeRule = getRules((rule) =>
      rule.selector.startsWith(".size_"),
    ).at(-1);
    const firstWeightRule = getRules((rule) =>
      rule.selector.startsWith(".font-weight_"),
    )[0];

    expect(lastSizeRule).toBeDefined();
    expect(firstWeightRule).toBeDefined();
    expect(
      root.index(firstWeightRule as Rule) >
        root.index(
          (lastSizeRule?.parent?.type === "atrule"
            ? lastSizeRule.parent
            : lastSizeRule) as Rule,
        ),
    ).toBe(true);
  });
});
