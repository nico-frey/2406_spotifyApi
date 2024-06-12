var path = require("path");

module.exports = {
  mode: "development", // Change "development" to "production" or "none" as needed
  entry: "./src/js/script.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },
  devServer: {
    static: path.join(__dirname),
    port: 8080,
    open: true,
  },
};
