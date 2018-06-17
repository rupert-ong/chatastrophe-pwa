const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      inject: true,
      template: __dirname + '/public/index.html',
      publicPath: '/'
    })
  ],

  devServer: {
    contentBase: "./public",
    historyApiFallback: true,
    hot: true
  }
};