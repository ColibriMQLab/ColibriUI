const { writeFile, ensureDir } = require('fs-extra');
const { resolve, dirname } = require("path");
const { THEMES } = require('../src/components/Theme');

const inputDir = './src';
const distPaths = ["dist", "dist/esm"];

async function variables() {
	let themeJaipur = "";
	let themeBA = "";
	Object.entries(THEMES.JAIPUR).forEach(([key, value]) => {
		themeJaipur += `--${key}: ${value};\r\n`;
	});
	Object.entries(THEMES.BA).forEach(([key, value]) => {
		themeBA += `--${key}: ${value};\r\n`;
	});
	const jaipurContent = `.theme {\r\n${themeJaipur}}`;
	const baContent = `.theme {\r\n${themeBA}}`;

	for (const outputDir of distPaths) {
		const jaipurPath = resolve(outputDir, 'theme_jaipur_variables.css');
		const baPath = resolve(outputDir, 'theme_ba_variables.css');
		await ensureDir(dirname(jaipurPath));
		await writeFile(jaipurPath, jaipurContent);
		await writeFile(baPath, baContent);
	}
}

variables().catch(err => console.error(err));
