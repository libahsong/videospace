const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BASE_JS = "./src/client/js/";

const config = {
  //   devtool: "cheap-module-source-map",
  entry: {
    main: BASE_JS + "main.js",
  },
  plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};

module.exports = config;
