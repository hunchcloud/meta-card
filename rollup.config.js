import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

const entries = ["meta-card", "meta-img"];

export default entries
  .map(entry => [
    {
      input: `src/${entry}.ts`,
      output: [
        {
          file: `dist/${entry}.js`,
          format: "es"
        }
      ],
      plugins: [typescript()]
    },
    {
      input: `src/${entry}.ts`,
      output: [
        {
          file: `dist/${entry}.min.js`,
          format: "iife"
        }
      ],
      plugins: [typescript(), terser()]
    }
  ])
  .flat();
