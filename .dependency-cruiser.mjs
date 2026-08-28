import { readdirSync, statSync } from "node:fs";

const componentsRoot = new URL("src/components/", import.meta.url);
const sharedComponentRoots = [
  "Theme/",
  "Icons/",
  "base/",
  "hooks/",
  "helpers/",
  "lib/",
  "libs/",
];
const ignoredComponentNames = new Set(
  sharedComponentRoots.map((directory) => directory.replace("/", "")),
);
const componentNames = readdirSync(componentsRoot)
  .filter((name) => statSync(new URL(name, componentsRoot)).isDirectory())
  .filter((name) => !ignoredComponentNames.has(name));
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const createPrivateCrossImportRule = (componentName) => {
  const escapedName = escapeRegExp(componentName);

  return {
    name: `${componentName}-private-cross-imports`,
    comment:
      "Import another component through its public entry. Keep implementation files private to their component folder.",
    severity: "error",
    from: {
      path: "^src/components/",
      pathNot: `\\.(?:stories|test)\\.(?:ts|tsx)$|/__tests__/|^src/components/(?:index\\.ts|${escapedName}/)`,
    },
    to: {
      path: `^src/components/${escapedName}/(?!index\\.(?:ts|tsx)$|index\\.props\\.ts$|README\\.md$).+`,
      pathNot: `^(?:src/components/${escapedName}/tokens\\.ts|src/components/(?:Menu/components/MenuItem|Grid/Item)/index\\.tsx)$`,
    },
  };
};

export default {
  forbidden: [
    {
      name: "no-circular",
      comment: "Do not introduce circular dependencies between components.",
      severity: "error",
      from: {},
      to: {
        circular: true,
        dependencyTypesNot: [
          "type-only",
          "type-import",
          "pre-compilation-only",
        ],
      },
    },
    {
      name: "not-to-unresolvable",
      comment: "All imports must resolve with the library TypeScript config.",
      severity: "error",
      from: {},
      to: {
        couldNotResolve: true,
      },
    },
    {
      name: "runtime-not-to-stories-or-tests",
      comment: "Runtime component code must not depend on stories or tests.",
      severity: "error",
      from: {
        path: "^src/",
        pathNot: "\\.(?:stories|test)\\.(?:ts|tsx)$|/__tests__/",
      },
      to: {
        path: "\\.(?:stories|test)\\.(?:ts|tsx)$|/__tests__/",
      },
    },
    {
      name: "components-not-to-dist",
      comment: "Source components must not import generated package output.",
      severity: "error",
      from: {
        path: "^src/components/",
      },
      to: {
        path: "^dist/",
      },
    },
    ...componentNames.map(createPrivateCrossImportRule),
  ],
  options: {
    doNotFollow: {
      path: "node_modules",
      dependencyTypes: [
        "npm",
        "npm-dev",
        "npm-optional",
        "npm-peer",
        "npm-bundled",
        "npm-no-pkg",
      ],
    },
    exclude: {
      path: "^(?:dist|storybook-static|node_modules|\\.codegraph)/|\\.(?:stories|test)\\.(?:ts|tsx)$|/__tests__/",
    },
    progress: {
      type: "none",
    },
    tsConfig: {
      fileName: "tsconfig.json",
    },
    tsPreCompilationDeps: true,
  },
};
