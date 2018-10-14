const path = require('path')
const CopyWebpackPlugin=require('copy-webpack-plugin')

module.exports = {
  entry: {
    international:path.resolve('views/international/international.js'),
    index:path.resolve('views/index/index.js'),
    concat:path.resolve('views/concat/concat.js'),
    culture:path.resolve('views/culture/culture.js')
  },
  output: {
    path: path.resolve('./js')
  },
  resolve: {
    extensions: ['.js'],
    alias: {
        modules: path.resolve('modules'),
        lib:path.resolve('lib'),
        comps:path.resolve('comps')
    }
  },
  // module: {
  //   loaders: [

  //   ]
  // },
  plugins: [
    new CopyWebpackPlugin([{
          from:path.resolve('asserts')
        }])
  ]
}

