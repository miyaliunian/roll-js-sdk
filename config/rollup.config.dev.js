import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import pkg from "../package.json";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
export default [
  {
    input: "src/app.js",
    output: [
      {
        file: `${process.cwd()}/lib/index.js`,
        format: "umd",
        name: pkg.name,
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: "runtime",
        exclude: "node_modules/**",
      }),
      livereload(),
      serve({
        open: true,
        port: 9000,
        openPage: "/public/index.html",
        contentBase: "./",
      }),
    ],
  },
];
