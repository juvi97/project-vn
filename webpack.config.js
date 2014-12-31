module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + "/bundle",
    filename: 'bundle.js',
    publicPath: "/bundle/"
  }
};