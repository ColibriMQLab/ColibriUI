const path = require('path');
const { existsSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

const existPackageJson = existsSync('package.json');

if (existPackageJson) {
    try {
        execSync('cp package.json dist', { stdio: 'inherit' });
        const packageJsonPath = path.join(path.resolve(__dirname, '../dist'), 'package.json');
        const packageJson = require(packageJsonPath);
        packageJson.scripts = {};
        writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    } catch (err) {
        throw new Error(`Could not copy package.json file because of an error: ${err}`)
    }
}