const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const entry = {
  index: './src/main/index.tsx',
  login: './src/login/index.tsx',
  signup: './src/signup/index.tsx',
};

function capitalize(v) {
  return `${v[0].toUpperCase()}${v.slice(1)}`;
}

module.exports = {
  mode: 'production',
  entry,
  output: {
    path: path.resolve('./dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'ts-loader',
      },
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: [/\.m\.css/],
      },
      {
        test: /\.m\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    ...Object.keys(entry).map((k) => {
      return new HtmlWebpackPlugin({
        inject: true,
        chunks: [k],
        title: `Plantr - ${capitalize(k)}`,
        filename: `${k}.html`,
        template: path.resolve('./src/tpl.html'),
      });
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },
  devServer: {
    contentBase: path.resolve('./dist'),
  },
};
