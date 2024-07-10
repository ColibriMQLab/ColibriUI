const { writeFile, readFile } = require('fs-extra');
const fg = require("fast-glob");

const inputDir = 'dist';

async function updateTsImports() {
  const files = await fg(`${inputDir}/**/*.js`);

  for (const file of files) {
    const fileContent = await readFile(file, 'utf-8');
    const updatedTsFileContent = fileContent.replace(/\.scss/g, '.css');
    await writeFile(file, updatedTsFileContent);
  }
}

updateTsImports().catch(err => console.error(err));
