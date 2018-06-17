const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestWebpackPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: [
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
      },
      {
        test: /\.(ico|png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[ext]'
          }
        }],
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    publicPath: './'
  },

  plugins: [
    new HTMLWebpackPlugin({
      inject: true,
      template: __dirname + '/public/index.html',
      publicPath: './',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/public/',
        to: '',
        ignore: ['*.html', 'secrets-template.js'],
        toType: 'dir'
      }
    ]),
    new ManifestWebpackPlugin({
      fileName: 'asset-manifest.json'
    })
  ]
};