const webpack = require('webpack')
const resolve = require('path').resolve
let httpBaseUrl = ""//接口请求地址
let publicPath = ""//打包部署路径

switch (process.env.NODE_ENV) {
  case 'serve':
    httpBaseUrl = "http://127.0.0.1/bigapple/"
    publicPath = "/"
    break;
  case 'dev':
    httpBaseUrl = "/bigapple"
    publicPath = "/bigapple"
    break;
  case 'preProduct':
    httpBaseUrl = "/bigapple"
    publicPath = "/bigapple"
    break;
  case 'product':
    httpBaseUrl = "/bigapple"
    publicPath = "/bigapple"
    break;
}

module.exports = {
  baseUrl: publicPath,
  assetsDir: 'static',
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8088
  },
  configureWebpack: {
    output: {
      path: resolve(__dirname, 'dist'),
      filename: `js/[name]${new Date().getTime()}.js`,
    },
    plugins: [
      new webpack.DefinePlugin({
        HTTP_BASE_URL: JSON.stringify(httpBaseUrl),
      }),
      new webpack.ProvidePlugin(
        {
          $: "jquery",
          jQuery: "jquery",
          "windows.jQuery": "jquery"
        }
      )
    ]
  },
}
