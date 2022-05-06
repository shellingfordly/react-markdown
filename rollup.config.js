import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";
// 引入插件
import postcss from "rollup-plugin-postcss";

const entry = "src/index.ts";

// 忽略文件
const externalConfig = [
  (id) => /\/__expample__|main.tsx/.test(id), // 组件的本地测试文件，不希望被打包。
  "react",
  "react-dom",
  "classname",
  "react-is",
  "showdown",
  "@ant-design/icons",
  "**/node_modules/**",
];

// ES Module打包输出
const esmOutput = {
  preserveModules: true,
  // preserveModulesRoot: 'src',
  // exports: 'named',
  assetFileNames: ({ name }) => {
    const { ext, dir, base } = path.parse(name);
    if (ext !== ".css") return "[name].[ext]";
    // 规范 style 的输出格式
    return path.join(dir, "style", base);
  },
};

// less打包
const processScss = function (context) {
  return new Promise((resolve, reject) => {
    less.compile(
      {
        file: context,
      },
      function (err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(result);
        }
      }
    );
    less.compile(context, {}).then(
      function (output) {
        if (output && output.css) {
          resolve(output.css);
        } else {
          reject({});
        }
      },
      function (err) {
        reject(err);
      }
    );
  });
};

export default [
  {
    input: entry,
    output: [
      { ...esmOutput, filname: "index.esm.js", dir: "dist/es/", format: "esm" },
    ],
    plugins: [
      postcss({
        extract: true,
        process: processScss,
      }),
      resolve(),
      commonjs(),
      typescript(),
      json(),
      babel(),
    ],
    external: externalConfig,
  },
  {
    input: entry,
    output: [
      {
        ...esmOutput,
        filename: "index.d.ts",
        dir: "dist/es/type",
        format: "esm",
      },
    ],
    plugins: [dts()],
    external: externalConfig,
  },
];
