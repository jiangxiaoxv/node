module.exports = {
  env: {
    browser: 'amd', // 使用环境，生成eslint风格，我们选择了standard风格，里面配置了node、window
    es2021: true
  },
  extends: [ // 共享一些配置
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: { // 语法检查，es6+
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    // 'no-alert': 'error'
  },
  globals: {
    jQuery: 'readonly' // 声明全局可用对象，像window一样
  }
}
