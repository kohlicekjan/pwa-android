const pkg = require('./package.json');

const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const GenerateSW = require('workbox-webpack-plugin').GenerateSW;
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isDev = process.argv.indexOf('development') > 0;
const distPath = path.resolve('dist');


module.exports = {
  mode: isDev ? "development" : "production",
  entry: path.resolve('src', 'index.tsx'),
  output: {
    path: distPath,
    filename: path.join('[name].[hash].js'),
    publicPath: './',
    sourceMapFilename: '[file].map'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { name: path.join('assets', 'img', '[name].[ext]') }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath: (url, resourcePath, context) => {
              return '/' + url
            },
            name: path.join('assets', 'fonts', '[path][name].[ext]')
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devtool: isDev ? 'inline-source-map' : "eval",
  devServer: {
    contentBase: distPath,
    publicPath: '/',
    open: true,
    historyApiFallback: true,
    noInfo: true,
    compress: true
  },
  plugins: [
    new CleanWebpackPlugin({
      outputPath: distPath
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve('src', 'index.html'),
      inject: "body",
      favicon: path.resolve('assets', 'icons', 'android-icon.png'),
      minify: {
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        preserveLineBreaks: false,
        removeAttributeQuotes: true,
        removeComments: true
      }
    }),
    new WebpackPwaManifest({
      name: 'PWA - Android',
      short_name: 'PWA-Android',
      description: 'Description',
      background_color: '#ffffff',
      theme_color: '#78C257',
      icons: [
        {
          src: path.resolve('assets', 'icons', 'android-icon.png'),
          sizes: [48, 72, 96, 144, 192, 256, 384, 512],
          destination: path.join('assets', 'favicons')
        }
      ],
      ios: false,
      inject: true,
      fingerprints: false
    }),
    new CspHtmlWebpackPlugin(null),
    new GenerateSW({
        swDest: 'sw.js',
        importWorkboxFrom: 'local',
        clientsClaim: true,
        skipWaiting: true
    })
    // new BundleAnalyzerPlugin()
  ]
};