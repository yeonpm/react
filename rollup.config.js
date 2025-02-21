import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import useClientPlugin from "./rollup-plugin-use-client.js";

const config = [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src",
        exports: "named",
      },
      {
        dir: "dist/esm",
        format: "esm",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    ],
    plugins: [
      useClientPlugin(),
      peerDepsExternal(),
      resolve({
        preferBuiltins: true,
      }),
      commonjs({
        esmExternals: true,
        requireReturnsDefault: "auto",
      }),
      typescript({
        tsconfig: false,
        compilerOptions: {
          module: "esnext",
          target: "es5",
          lib: ["dom", "esnext"],
          sourceMap: true,
          moduleResolution: "node",
          allowSyntheticDefaultImports: true,
          esModuleInterop: true,
          strict: true,
          skipLibCheck: true,
          jsx: "react-jsx",
          forceConsistentCasingInFileNames: true,
          noImplicitReturns: true,
          noImplicitThis: true,
          noImplicitAny: true,
          strictNullChecks: true,
          noUnusedLocals: false,
          noUnusedParameters: true,
        },
        include: ["src/**/*"],
        exclude: ["node_modules", "dist"],
      }),
      terser(),
    ],
    external: ["@emotion/react", "@emotion/styled", "react", "react-dom"],
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "esm",
      },
    ],
    plugins: [dts()],
  },
];

export default config;
