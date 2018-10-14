var path=require('path')
var webpack=require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const pkg = require('../package')
const config = require('./webpack.base')

const cdnUrl = 'js/'

config.mode=process.env.NODE_ENV || 'production'

config.output.publicPath = cdnUrl
config.output.filename='[name].[chunkhash:6].js' 

config.plugins.push(
  new HtmlWebpackPlugin({
    template:path.resolve("views/international/international.html"),
    ENV:config.mode,
    filename:path.resolve('international.html'),
    chunks:['international']
  }),
  new HtmlWebpackPlugin({
    template:path.resolve("views/index/index.html"),
    ENV:config.mode,
    filename:path.resolve('index.html'),
    chunks:['index']
  }),
  new HtmlWebpackPlugin({
    template:path.resolve("views/concat/concat.html"),
    ENV:config.mode,
    filename:path.resolve('concat.html'),
    chunks:['concat']
  }),
  new HtmlWebpackPlugin({
    template:path.resolve("views/culture/culture.html"),
    ENV:config.mode,
    filename:path.resolve('culture.html'),
    chunks:['culture']
  }),
  new webpack.DefinePlugin({
    'isNodeDev': config.mode=='production'?false:true
  })
)

module.exports = config
