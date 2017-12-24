const path = require( 'path' )

module.exports = {
  entry: './src/main.js',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'bundle.js',
    path: path.resolve( __dirname, 'dist/' ),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
}
