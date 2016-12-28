import resolve from "rollup-plugin-node-resolve";
import purs from "rollup-plugin-purs";

export default {
  entry: "src/Main.purs",
  dest: "dist/js/rollup.js",
  format: "iife",
  sourceMap: true,
  plugins: [
    purs(),
    resolve()
  ]
};
