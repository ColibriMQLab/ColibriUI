const { writeFile, mkdir } = require('fs-extra');
const { relative, join, dirname } = require("path");
const fg = require("fast-glob");
const sass = require('sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')

const inputDir = './src';
const distPaths = ["dist", "dist/esm"];
const postcssProcessor = postcss([autoprefixer]);

async function compileSass() {
  const files = await fg(`${inputDir}/**/*.scss`);
  await Promise.all(files.map(async (fileName) => {
    const relativePath = relative(`${inputDir}/components`, fileName);
    const result = sass.compile(fileName);
    const { css } = await postcssProcessor.process(result.css, { from: fileName });

    for (const outputDir of distPaths) {
        const outputFilePath = join(outputDir, relativePath.replace(/\.scss$/, '.css'));
        await mkdir(dirname(outputFilePath), { recursive: true });
        await writeFile(outputFilePath, css);
    }
  }))
}

compileSass().catch(err => {
  console.error(err);
  process.exit(1);
});
