const { NxWebpackPlugin } = require('@nx/webpack');
const { NxReactWebpackPlugin } = require('@nx/react');
const { join } = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load environment variables from .env file
const env = dotenv.config().parsed;

// Create an object of environment variables prefixed with REACT_APP_
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  output: {
    path: join(__dirname, './dist/git-notes'),
  },
  devServer: {
    port: 4200,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin(envKeys), // Add this line to define environment variables
    new NxWebpackPlugin({
      tsConfig: './tsconfig.app.json',
      compiler: 'babel',
      main: './src/main.tsx',
      index: './src/index.html',
      baseHref: '/',
      assets: ['./src/favicon.ico', './src/assets'],
      styles: ['./src/styles.scss'],
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      optimization: process.env['NODE_ENV'] === 'production',
    }),
    new NxReactWebpackPlugin({
      // Uncomment this line if you don't want to use SVGR
      // See: https://react-svgr.com/
      // svgr: false
    }),
  ],
};
