const { writeFile, ensureDir } = require('fs-extra');
const { resolve, dirname } = require("path");
const { THEMES } = require('../src/components/Theme');

const inputDir = './src';
const distPaths = ["dist", "dist/esm"];

async function variables() {
  let themeDefault = "";
  let themeBA = "";
  Object.entries(THEMES.DEFAULT).forEach(([key, value]) => {
    themeDefault += `--${key}: ${value};\r\n`;
  });
  Object.entries(THEMES.BA).forEach(([key, value]) => {
    themeBA += `--${key}: ${value};\r\n`;
  });
  const defaultContent = `.theme {\r\n${themeDefault}}`;
  const baContent = `.theme {\r\n${themeBA}}`;

  for (const outputDir of distPaths) {
    const defaultPath = resolve(outputDir, 'theme_default_variables.css');
    const baPath = resolve(outputDir, 'theme_ba_variables.css');
    await ensureDir(dirname(defaultPath));
    await writeFile(defaultPath, defaultContent);
    await writeFile(baPath, baContent);
  }
}

variables().catch(err => console.error(err));