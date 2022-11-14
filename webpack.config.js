const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLInlineCSSWebpackPlugin =
  require("html-inline-css-webpack-plugin").default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");

const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./docs"),
    publicPath: "",
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "./docs"),
    },
    compress: true,
    port: 9000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
      },
      {
        test: /\.wav$/,
        loader: "file-loader",
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
      favicon: path.resolve(__dirname, "./src/assets/images/Duck.png"),
      inject: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./public"),
          to: "assets",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new HTMLInlineCSSWebpackPlugin(),
    new HtmlInlineScriptPlugin(),
  ],
};
