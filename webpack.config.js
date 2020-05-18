/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const Dotenv = require('dotenv-webpack');


const postcss = require('postcss')([require('postcss-rtl')()])

const env = process.env.NODE_ENV
const isProduction = (env === 'production')

process.on('uncaughtException', err => {
  // eslint-disable-next-line no-console
  console.log('webpack uncaughtException:', err)
})

module.exports = {
  mode: isProduction ? 'production' : 'development',
  bail: true,
  entry: {
    'app.js': './client/src/app.tsx',
    'public/js/check-authentication.js': './client/src/check-authentication.ts'
  },
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: '[name]'
  },

  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].map',
      noSources: isProduction
    }),
    new CopyWebpackPlugin([]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new Dotenv(),
    new LiveReloadPlugin()
  ],

  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader?configFileName=tsconfig.json'
      },

      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },

      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },

      {
        test: [/\.css$/, /\.less$/],
        use: [
          require.resolve('style-loader'),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')(),
                require('postcss-rtl')()
              ]
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false
  }
}
