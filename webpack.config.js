/*global __dirname, require, module*/
const nodeExternals = require('webpack-node-externals');

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');

let plugins = [], outputFile;

plugins.push(new UglifyJsPlugin({ minimize : true }));
outputFile = 'library.js';

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: 'library',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
      }
    ]
  },
  externals: [nodeExternals()],
  resolve: {
    modules: [path.resolve('./src')],
    extensions: ['.json', '.js'],
  },
  plugins: plugins,
};

module.exports = config;