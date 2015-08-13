var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
var data = require('./data')
var webpack = require('webpack');

// from jamon https://github.com/webpack/webpack-dev-server/pull/127#issuecomment-90702687
var rewriteUrl = function(replacePath) {
    return function(req, opt) {  // gets called with request and proxy object
        var queryIndex = req.url.indexOf('?');
        var query = queryIndex >= 0 ? req.url.substr(queryIndex) : "";
        req.url = req.path.replace(opt.path, replacePath) + query;
        console.log("rewriting ", req.originalUrl, req.url);
    };
};

module.exports = {
  entry: './entry.js',

  output: {
    filename: 'bundle.js',
    path: __dirname + '/public',
    libraryTarget: 'umd'
  },

  module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
        {
          test: /\.css/,
          exclude: /colors\.css/,
          loader: 'css-loader!cssnext-loader'
        }
      ]
    },

  plugins: [
    new StaticSiteGeneratorPlugin('bundle.js', data.routes, data)
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
    proxy: [
      {
        path: /^\/api\/(.*)/,
        changeOrigin: true,
        target: 'http://rawgit.com/TaopaiC/78df3397f3eaf715bbb3/raw/9a737c0886bb3bd7e8469fd2676212b20775da03/',
        rewrite: rewriteUrl("/$1")
      }
    ]
  }
}
