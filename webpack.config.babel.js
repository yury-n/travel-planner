const path = require('path');

module.exports = {
    devtool: 'eval',
    entry: './client/index',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    resolve: {
        alias: {
            'styles': path.join(__dirname, 'styles'),
        },
        extensions: ['', '.js', '.jsx', '.css']
    },
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
