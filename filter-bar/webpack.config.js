const webpack = require('webpack');
const path = require('path');
const rucksack = require('rucksack-css');
const poststylus = require('poststylus');

const production_react = process.env.NODE_ENV === 'production';
const minimize = production_react;
const full_polyfill = false;


const exclude = /node_modules/;

const config = env => ({
  context: __dirname,
  entry: {
    deps: ['react', 'react-dom', 'react-router', 'uuid'],
    app: ['babel-polyfill', './src/index'],
  },
  output: {
      // [TODO] add this https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.m7h0al8ji
    filename: '[name].bundle.js',
    library: 'app',
    path: path.join(__dirname, './build'),
    publicPath: path.join('/build'),
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  plugins:
    [].concat(env.test ? [] : new webpack.optimize.CommonsChunkPlugin({ name: 'deps', filename: 'deps.bundle.js' }))
      .concat(minimize ? [new webpack.optimize.UglifyJsPlugin({ minimize: true })] : [])
      .concat([
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()]),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: ['babel-loader'],
        exclude,
      },
      // newer webpack versions break without this
      // https://github.com/webpack/webpack/issues/592
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
        ],
      },
      {
        test: /\.styl$/,
        loader: 'style!css?modules&sourceMap&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!stylus',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.(ttf|eot|htc)$/,
        loader: 'file-loader',
      },
    ],
    preLoaders: [
      // order matters
      // {
      //   test: /\.c\.js$/,
      //   loader: ['./resources/declassify'],
      //   exclude,
      // },
      {
        test: /\.jsx?$/,
        loaders: ['source-map-loader'/*, 'eslint-loader'*/],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['', '.c.js', '.js', '.jsx'],
    modules: [path.resolve(__dirname, "node_modules"), "node_modules"]
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, "node_modules"), "node_modules"]
  },
  stylus: {
    use: [
      poststylus(['autoprefixer', 'rucksack-css']),
    ],
  },
  devServer: {
    contentBase: './',
  },
  eslint: {
    configFile: './.eslintrc',
    failOnError: false,
    failOnWarning: false,
  },
});

module.exports = config;
