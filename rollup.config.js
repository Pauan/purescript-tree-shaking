import purs from "rollup-plugin-purs";
import sourcemaps from "rollup-plugin-sourcemaps";

export default {
  entry: "src/Main.purs",
  dest: "dist/js/rollup.js",
  format: "iife",
  sourceMap: true,
  plugins: [
    purs({
      uncurry: true,
      inline: true,
      debug: true
    }),
    //sourcemaps()
  ]
};
