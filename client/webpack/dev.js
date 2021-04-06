const DotenvWebpackPlugin = require('dotenv-webpack');
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
    new DotenvWebpackPlugin({
      path: '../.env',
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['index'],
      title: `Plantr`,
      filename: `index.html`,
      template: path.resolve('./src/tpl.html'),
    }),
    ...Object.keys(entry).map((k) => {
      return new HtmlWebpackPlugin({
        inject: true,
        chunks: [k],
        title: `Plantr - ${capitalize(k)}`,
        filename: `${k}/index.html`,
        template: path.resolve('./src/tpl.html'),
      });
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },
  devServer: {
    contentBase: path.resolve('./dist'),
    writeToDisk: true,
  },
};
