const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    feelH: "./src/feelH.js",
    h: "./src/h.js",
    feelDiff: "./src/feelDiff.js",
    diff: "./src/diff.js",
  },
  output: {
    path: __dirname,
    // publicPath:'/xuni',
    filename: "./dist/[name].js",
  },
  devServer: {
    static: "pages",
    port: 8080,
    hot: true,
    open: true,
  },
};
