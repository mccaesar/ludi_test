const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProduction = process.env.NODE_ENV === 'production';
const config = {
  entry: {
    main: '/src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: isProduction
      ? '[name].[contenthash].bundle.js'
      : '[name].bundle.js',
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({ 
      title: 'OLCN', 
      template: 'public/index.html'
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: isProduction ? 'production' : 'development',
      REACT_APP_PORT: 3000,
      REACT_APP_API_URI: isProduction
        ? 'https://openlibrary.web.illinois.edu/api'
        : 'http://localhost:5000/api',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          envName: isProduction ? 'production' : 'development',
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'app')],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  devServer: {
    open: true,
    port: 3000,
    compress: true,
    historyApiFallback: true,
  },
  optimization: {
    minimize: isProduction ? true : false,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = 'development';
  }
  return config;
};
