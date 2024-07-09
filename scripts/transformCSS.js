const { dirname, relative, resolve } = require("path");
const { readFile, writeFile, ensureDir } = require('fs-extra');
const fg = require("fast-glob");
const postcss = require('postcss')

const inputDir = './src';
const distPaths = ["dist", "dist/esm"];

const plugins = [
    require('postcss-import')(),
    require('autoprefixer'),
  ];

const transformCSS = async () => {
    const files = await fg(`${inputDir}/**/*.scss`);
    const firstDistPath = distPaths[0];
    const postcssProcessor = postcss([
        ...plugins
    ]);
    
    files.forEach(async (fileName) => {
        const css = await readFile(fileName);
        const distFilename = resolve(firstDistPath, relative(inputDir, fileName));
        const processedCss = await postcssProcessor.process(css, { from: fileName, to: distFilename });
        for (const outputDir of distPaths) {
            const relativePath = relative(`${inputDir}/components`, fileName);
            const newPath = resolve(outputDir, relativePath);
            await ensureDir(dirname(newPath));
            writeFile(newPath, processedCss.css);
            console.log(`Compiled ${newPath} to SASS.`);
        }
    });
};

transformCSS().catch(err => console.error(err));