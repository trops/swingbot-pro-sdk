const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [{
  mode: 'development',
  target: 'node',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'swingbot-pro-sdk.js',
    library: 'SwingbotProSDK',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  optimization: {},
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: /(\.jsx|\.js)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      util: 'util',
      stream: 'readable-stream',
      crypto: 'crypto-browserify'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_DEBUG': JSON.stringify('development'),
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
},
{
  mode: 'development',
  target: 'web',
  entry: './src/index.js',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    hot: true,
    port: 8080
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'swingbot-pro-sdk.min.js',
    library: 'SwingbotProSDK',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  optimization: {},
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: /(\.jsx|\.js)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }]
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      util: 'util',
      stream: 'readable-stream',
      crypto: 'crypto-browserify'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_DEBUG': JSON.stringify('development'),
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}
];
