const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const entry = {
  index: './src/entry/index.tsx',
  login: './src/entry/login.tsx',
  signup: './src/entry/signup.tsx',
};

function capitalize(v) {
  return `${v[0].toUpperCase()}${v.slice(1)}`;
}

module.exports = {
  mode: 'development',
  entry,
  output: {
    path: path.resolve('./dist'),
  },
  devtool: 'eval-source-map',
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
          'style-loader',
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
        template: path.resolve('./src/entry/tpl.html'),
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
