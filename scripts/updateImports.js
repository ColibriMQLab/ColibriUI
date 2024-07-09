const { promises } = require("fs");
const fg = require("fast-glob");

const inputDir = 'dist';

async function updateTsImports() {
  const files = await fg(`${inputDir}/**/*.js`);

  for (const file of files) {
    const jsFileContent = await promises.readFile(file, 'utf-8');
    const updatedTsFileContent = jsFileContent.replace(/\.scss/g, '.css');
    await promises.writeFile(file, updatedTsFileContent);
  }
}

updateTsImports().catch(err => console.error(err));
