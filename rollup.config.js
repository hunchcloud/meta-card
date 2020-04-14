import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/meta-img.ts",
    output: {
      file: "meta-img.umd.js",
      format: "umd"
    },
    plugins: [typescript(), terser()]
  }
];
