import resolve from "rollup-plugin-node-resolve";
//import purs from "./rollup-plugin-purs.js";
import purs from "rollup-plugin-purs";
//import sourcemaps from "rollup-plugin-sourcemaps";
//import commonjs from "rollup-plugin-commonjs";

export default {
  entry: "src/Main.purs",
  dest: "dist/rollup.js",
  format: "iife",
  sourceMap: true,
  plugins: [
    //sourcemaps(),
    purs(),
    resolve()
  ]
};
