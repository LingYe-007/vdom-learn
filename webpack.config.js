const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    publicPath:'/xuni',
    filename: "bundle.js",
  },
  devServer: {
    static:"www",
    port: 8080,
    hot: true,
    open: true,
  },
};
