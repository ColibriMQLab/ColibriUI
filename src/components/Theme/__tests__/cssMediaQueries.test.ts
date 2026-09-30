import { readdirSync, readFileSync } from "fs";
import { join, relative } from "path";

const SRC_DIR = join(__dirname, "../../..");
const ALLOWED_WIDTHS = ["40rem", "48rem", "64rem", "80rem", "96rem"];

const collectCssFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return collectCssFiles(path);
    return /\.(s?css)$/.test(entry.name) ? [path] : [];
  });

const getMediaPreludes = (css: string) =>
  Array.from(css.matchAll(/@media([^{;]*)[{;]/g), ([, prelude]) =>
    prelude.trim(),
  );

describe("CSS media queries", () => {
  const files = collectCssFiles(SRC_DIR);

  it("finds the kit CSS files", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files.map((file) => [relative(SRC_DIR, file), file]))(
    "%s uses only allowed breakpoints in range syntax",
    (_, file) => {
      const preludes = getMediaPreludes(readFileSync(file, "utf8"));

      preludes.forEach((prelude) => {
        expect(prelude).not.toMatch(/\b(min|max)-width\b/);

        if (/\bwidth\b/.test(prelude)) {
          const lengths = prelude.match(/-?\d*\.?\d+[a-z%]+/gi) ?? [];
          expect(lengths.length).toBeGreaterThan(0);
          lengths.forEach((length) => {
            expect(ALLOWED_WIDTHS).toContain(length);
          });
        }
      });
    },
  );
});
