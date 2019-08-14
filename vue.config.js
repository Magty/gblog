const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/api',
        ws: true,
        changeOrgin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
