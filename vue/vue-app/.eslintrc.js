module.exports = {
    root: true,
    env: {
        browser: "amd", // 使用环境，生成eslint风格，我们选择了standard风格，里面配置了node、window
        node: true,
        commonjs: true,
        es2021: true,
        es6: true,
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: {
        sourceType: "module",
        // 语法检查，es6+
        // ecmaVersion: 'latest',
        //把 latest 这里修改一下就好了
        ecmaVersion: 12,
        allowImportExportEverywhere: true, // 不限制eslint对import使用位置
        ecmaFeatures: {
            modules: true,
            legacyDecorators: true,
            jsx: true,
        },
        path: {
            "@/*": ["src/*"],
        },
    },

    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-unused-vars": 1,
        "prettier/prettier": [
            "warn",
            {
                endOfLine: "auto",
            },
        ],
        "vue/multi-word-component-names": [
            "error",
            {
                ignores: ["index"], // 需要忽略的组建名
            },
        ],
    },
}
