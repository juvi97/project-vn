var webpack = require('webpack');
module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + "/bundle",
    filename: 'bundle.js',
    publicPath: "bundle/"
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    warnings: false
    //  }
    //}),
    new webpack.IgnorePlugin(/.*\.s/i)
  ]
};