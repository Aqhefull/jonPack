const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");

const devMode = process.env.NODE_ENV === "production";
const postCss = {
  loader: "postcss-loader",
  options: {
    plugins: [
      autoprefixer({
        browsers: ["last 10 versions"],
        cascade: true
      })
    ],
    sourceMap: true
  }
};

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: devMode ? "[name].js" : "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          postCss,
          "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          "pug-loader",
          "pug-html-loader?pretty&exports=false?exports=false"
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "fonts/",
            outputPath: "fonts/"
          }
        }
      },
      {
        //IMAGE LOADER
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/"
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "jonPack",
      hash: true,
      minify: false,
      template: "./src/index.pug"
    }),
    new HtmlWebpackHarddiskPlugin(),
    new CopyWebpackPlugin([{ from: "src/img", to: "img" }]),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "src"),
    watchContentBase: true,
    compress: true,
    port: 3000,
    hot: false,
    stats: "errors-only",
    open: true,
    inline: false
  }
};
