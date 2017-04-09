var path = require('path');

module.exports = {
  devtool: 'source-map',
  watchOptions: {
    poll: true
  },
  entry: './src/index.js',
  output: {
    filename: './dist/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|test)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {
                "browserslist": [
                  "> 5%"
                ]
              }
            }]
          ],
          plugins: [
            'syntax-dynamic-import',
            'transform-async-to-generator',
            'transform-regenerator',
            'transform-runtime'
          ]
        }
      }]
    }]
  }
};
