const path = require('path');
const webpack = require("webpack");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const commonConfig = {
  context:path.resolve("src"),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {url: true,import:true}},
        ],
      }
    ]
  },
  resolve: {
    extensions: [ ".ts", ".js" ]
  },
  plugins: [
    new webpack.DefinePlugin({PRODUCTION: JSON.stringify(process.env.NODE_ENV === "production")})
  ]
};

module.exports = [
  {entry: "./app1.ts", output: { path: path.resolve("./public_html/js"), filename: "app1.js" } },
  {entry: "./app2.ts", output: { path: path.resolve("./public_html/js"), filename: "app2.js" } }
].map(function(item) {
  return Object.assign({}, commonConfig, item);
});
