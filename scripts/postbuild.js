const path = require("path");
const {
  promises: { readdir },
  writeFileSync,
} = require("fs");

const generatePackageJsons = async () => {
  try {
    const components = (
      await readdir(path.resolve(__dirname, "../dist"), { withFileTypes: true })
    )
      .filter((dir) => dir.isDirectory())
      .filter((dir) => {
        if (dir.name[0].toUpperCase() == dir.name[0]) {
          return dir.name;
        }
      })
      .map((dir) => dir.name);

    for (let item of components) {
      const packageJsonContent = {
        sideEffects: false,
        module: `../esm/${item}/index.js`,
        main: "./index.js",
        types: "./index.d.ts",
      };
      const componentPath = path.join(
        path.resolve(__dirname, `../dist/`),
        item,
      );
      writeFileSync(
        `${componentPath}/package.json`,
        JSON.stringify(packageJsonContent, null, 2),
      );
    }
  } catch (err) {
    throw new Error(
      `Could not create package.json file because of an error: ${err}`,
    );
  }
};

async function run() {
  try {
    await generatePackageJsons();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
