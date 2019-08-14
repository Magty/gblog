module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': [0 ,'error', 'windows'], //允许windows开发环境
    'allowForLoopAfterthoughts': true,//允许++ -- 一元运算符(for循环)
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
