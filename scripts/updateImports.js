// update-ts-imports.ts
import { promises as fs } from 'fs';
import * as path from 'path';
import fg from 'fast-glob';

const inputDir = 'src'; // Base directory where your TypeScript files are located
const outputDir = 'dist'; // Base directory where your TypeScript files are outputted

async function updateTsImports() {
  const files = await fg(`${inputDir}/**/*.tsx`);

  for (const file of files) {
    const tsFileContent = await fs.readFile(file, 'utf-8');
    const updatedTsFileContent = tsFileContent.replace(/\.scss/g, '.css');

    await fs.mkdir(path.dirname(path.join(outputDir, path.relative(inputDir, file))), { recursive: true });
    await fs.writeFile(path.join(outputDir, path.relative(inputDir, file)), updatedTsFileContent);
    console.log(`Updated imports in ${path.relative(inputDir, file)}.`);
  }
}

updateTsImports().catch(err => console.error(err));
