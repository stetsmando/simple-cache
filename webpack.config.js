const path = require('path')
const webpack = require('webpack')
const comment = `
@license SimpleCache v3.X

Author: Stetson Pierce

This source code is licensed under the MIT license.`

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'simple-cache.min.js',
    library: 'SimpleCache'
  },
  plugins: [
    new webpack.BannerPlugin(comment)
  ]
}
