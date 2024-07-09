const { promises } = require("fs");
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
        await promises.mkdir(dirname(outputFilePath), { recursive: true });
        await promises.writeFile(outputFilePath, result.css);
        console.log(`Compiled ${relativePath} to CSS in the ${outputDir}.`);
    }
  })
}

compileSass().catch(err => console.error(err));
