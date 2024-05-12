import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import url from "@rollup/plugin-url";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import svgr from "@svgr/rollup";
import { DEFAULT_EXTENSIONS } from "@babel/core";

const external = (id) => !id.startsWith(".") && !id.startsWith("/");

const getBabelOptions = ({ value }) => ({
  babelrc: false,
  presets: [
    ["@babel/preset-env", { modules: false }],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    ["@babel/transform-runtime", { useESModules: value }],
    "@emotion/babel-plugin",
  ],
  babelHelpers: "runtime",
  exclude: "/node_modules/**",
  extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
});

export default [
  {
    input: "./src/components/index.ts",
    output: [
      {
        dir: "dist/esm",
        format: "esm",
        preserveModules: true,
        preserveModulesRoot: "src/components",
      },
    ],
    external,
    treeshake: false,
    plugins: [
      url(),
      svgr(),
      nodeResolve({
        preferBuiltins: true,
        extensions: [".ts", ".tsx"],
      }),
      typescript(),
      commonjs({
        include: "node_modules/**",
      }),
      babel(getBabelOptions(true)),
    ],
  },
  {
    input: "./src/components/index.ts",
    output: [
      {
        dir: "dist",
        format: "cjs",
        preserveModules: true,
        preserveModulesRoot: "src/components",
        exports: "named",
      },
    ],
    external,
    treeshake: false,
    plugins: [
      url(),
      svgr(),
      nodeResolve({
        preferBuiltins: true,
        extensions: [".ts", ".tsx"],
      }),
      typescript({ outDir: "dist", declarationDir: "dist" }),
      commonjs({
        include: "node_modules/**",
      }),
      babel(getBabelOptions(false)),
    ],
  },
];
