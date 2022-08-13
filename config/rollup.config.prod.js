import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import pkg from "../package.json";
export default [
  {
    input: "src/app.js",
    output: [
      {
        file: `${process.cwd()}/lib/index.js`,
        format: "umd",
        name: pkg.name,
      },
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: "runtime",
        exclude: "node_modules/**",
      }),
      terser({
        output: {
          ascii_only: true,
        },
        compress: {
          pure_funcs: ["console.log"],
        },
      }),
    ],
  },
];
