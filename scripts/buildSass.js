const { writeFile, mkdir } = require('fs-extra');
const { relative, join, dirname } = require("path");
const fg = require("fast-glob");
const sass = require('sass')

const inputDir = './src';
const distPaths = ["dist", "dist/esm"];

async function compileSass() {
  const files = await fg(`${inputDir}/**/*.scss`);
  files.forEach(async (fileName) => {
    const relativePath = relative(`${inputDir}/components`, fileName);
    const result = sass.compile(fileName);

    for (const outputDir of distPaths) {
        const outputFilePath = join(outputDir, relativePath.replace(/\.scss$/, '.css'));
        await mkdir(dirname(outputFilePath), { recursive: true });
        await writeFile(outputFilePath, result.css);
    }
  })
}

compileSass().catch(err => console.error(err));
