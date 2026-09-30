// Checks the built package, not the sources: every public entry must export at
// runtime, in both CJS and ESM builds, every value its index.d.ts declares.
import { existsSync, readdirSync } from "node:fs";
import { createRequire, registerHooks } from "node:module";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const DIST = resolve("dist");
const REQUIRED = {
  Theme: ["BREAKPOINTS", "media", "THEMES"],
  ".": ["BREAKPOINTS", "media", "THEMES"],
};

// Node cannot load CSS modules; stub them for both require and import.
registerHooks({
  load(url, context, nextLoad) {
    if (/\.(s?css)$/.test(url)) {
      return {
        format: context.format === "commonjs" ? "commonjs" : "module",
        source: context.format === "commonjs"
          ? "module.exports = {};"
          : "export default {};",
        shortCircuit: true,
      };
    }
    return nextLoad(url, context);
  },
});

const entries = [
  ".",
  ...readdirSync(DIST, { withFileTypes: true })
    .filter((dir) => dir.isDirectory() && existsSync(join(DIST, dir.name, "package.json")))
    .map((dir) => dir.name),
];

const dtsFiles = entries.map((entry) => join(DIST, entry, "index.d.ts"));
const program = ts.createProgram(dtsFiles, {
  noEmit: true,
  skipLibCheck: true,
  jsx: ts.JsxEmit.React,
});
const checker = program.getTypeChecker();

const getDeclaredValues = (dtsFile) => {
  const source = program.getSourceFile(dtsFile);
  const moduleSymbol = source && checker.getSymbolAtLocation(source);
  if (!moduleSymbol) return [];

  return checker
    .getExportsOfModule(moduleSymbol)
    .filter((symbol) => {
      const target =
        symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
      return Boolean(target.flags & ts.SymbolFlags.Value);
    })
    .map((symbol) => symbol.getName());
};

const require = createRequire(import.meta.url);
const failures = [];

for (const entry of entries) {
  const dtsFile = join(DIST, entry, "index.d.ts");
  if (!existsSync(dtsFile)) {
    failures.push(`${entry}: missing index.d.ts`);
    continue;
  }

  const expected = [...new Set([...getDeclaredValues(dtsFile), ...(REQUIRED[entry] ?? [])])];
  const builds = {
    cjs: join(DIST, entry, "index.js"),
    esm: join(DIST, "esm", entry, "index.js"),
  };

  for (const [format, file] of Object.entries(builds)) {
    if (!existsSync(file)) {
      failures.push(`${entry} (${format}): missing ${file}`);
      continue;
    }

    let mod;
    try {
      mod = format === "cjs" ? require(file) : await import(pathToFileURL(file).href);
    } catch (error) {
      failures.push(`${entry} (${format}): failed to load: ${error.message}`);
      continue;
    }

    const missing = expected.filter((name) => mod[name] === undefined);
    if (missing.length) {
      failures.push(`${entry} (${format}): undefined exports: ${missing.join(", ")}`);
    }
  }
}

if (failures.length) {
  console.error(`Build check failed:\n  ${failures.join("\n  ")}`);
  process.exit(1);
}

console.log(`Build check passed: ${entries.length} entries, CJS and ESM.`);
