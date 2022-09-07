//.eslintrc.js

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['@vue/prettier', 'plugin:vue/vue3-essential', 'eslint:recommended'],
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['vue'],
    rules: {
        indent: 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': 1,
        'prettier/prettier': [
            'off',
            {
                endOfLine: 'auto',
            },
        ],
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['index'], // 需要忽略的组建名
            },
        ],
        'vue/comment-directive': [
            'error',
            {
                reportUnusedDisableDirectives: true,
            },
        ],
    },
}
