import resolve from "rollup-plugin-node-resolve";
//import purs from "./rollup-plugin-purs.js";
import purs from "rollup-plugin-purs";
//import commonjs from "rollup-plugin-commonjs";

export default {
  entry: "Main.js",
  dest: "dist/rollup.js",
  format: "iife",
  plugins: [
    resolve(),
    /*commonjs({
      exclude: "node_modules/**",
      namedExports: {
        "./output/Main/index.js": ["main"]
      }
    })*/
    purs({
      exclude: "node_modules/**"
    })
  ]
};
