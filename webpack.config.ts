import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server';
import type {Configuration} from 'webpack';

const devServer: DevServerConfiguration = {
  port: 3000,
  open: true,
  historyApiFallback: true,
};

const config: Configuration = {
  entry: path.join(__dirname, 'src/index.tsx'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, 'tsconfig.json'),
      }),
    ],
  },
  devServer,
  devtool: 'source-map',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        exclude: /build/,
      },
    ],
  },
};

export default config;
