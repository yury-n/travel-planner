const path = require('path');
//const webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: './client/index',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/static/',
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    plugins: [
      //new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          exclude: /node_modules/,
          include: __dirname,
        }
      ]
    },
};
