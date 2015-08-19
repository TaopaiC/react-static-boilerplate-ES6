var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
var data = require('./data')
var webpack = require('webpack');
var nodeFetch = require('node-fetch');

var api_prefix = 'http://rawgit.com/TaopaiC/78df3397f3eaf715bbb3/raw/9a737c0886bb3bd7e8469fd2676212b20775da03/';

// from jamon https://github.com/webpack/webpack-dev-server/pull/127#issuecomment-90702687
var rewriteUrl = function(replacePath) {
    return function(req, opt) {  // gets called with request and proxy object
        var queryIndex = req.url.indexOf('?');
        var query = queryIndex >= 0 ? req.url.substr(queryIndex) : "";
        req.url = req.path.replace(opt.path, replacePath) + query;
        console.log("rewriting ", req.originalUrl, req.url);
    };
};

global.FETCH = nodeFetch;
global.API_PREFIX = api_prefix;

module.exports = {
  entry: {
    'server': ['./entry.js'],
    'main': [
      'webpack-dev-server/client?http://0.0.0.0:8080/',
      'webpack/hot/only-dev-server',
      './entry.js'
    ]
  },

  output: {
    filename: process.env.NODE_ENV === 'production' ? '[name]-[hash].js' : '[name].js',
    path: __dirname + '/public',
    publicPath: "/",
    libraryTarget: 'umd',
    pathinfo: true
  },

  module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: process.env.NODE_ENV === 'production' ? ['babel-loader?optional=runtime&stage=0'] : ['react-hot', 'babel-loader?optional=runtime&stage=0']
        },
        {
          test: /\.css/,
          exclude: /colors\.css/,
          loader: 'css-loader!cssnext-loader'
        },
        { test: require.resolve('whatwg-fetch'), loader: 'imports?this=>global&self=>global!exports?global.fetch' }
      ]
    },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new StaticSiteGeneratorPlugin('server', data.routes, data)
  ],

  cssnext: {
    compress: true,
    features: {
      rem: false,
      pseudoElements: false,
      colorRgba: false
    }
  },
  devtool: 'cheap-source-map',

  devServer: {
    contentBase: __dirname + '/public',
    proxy: [
      {
        path: /^\/api\/(.*)/,
        changeOrigin: true,
        target: api_prefix,
        rewrite: rewriteUrl("/$1")
      }
    ]
  }
}
