/* Copyright 2019 The Chromium Authors. All Rights Reserved.
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  entry: {
    'app': './src/elements/db-app/db-app.js',
  },
  devtool: 'eval-source-map',
  plugins: [],
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    // Settings for deploying JS to production.
    config.devtool = 'source-map';

    config.plugins = config.plugins.concat([
      new webpack.DefinePlugin(
        {'process.env.NODE_ENV': '"production"'}
      ),
    ]);
  }

  if (argv.analyze) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  return config;
};