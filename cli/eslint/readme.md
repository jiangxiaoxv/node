
# Eslint
1. 最为主流的JavaScript工具 检测 js代码质量
2. eslint很容易统一开发者的编码风格
3. eslint可以帮助开发者提升编码能力

# Eslint 安装、校验
1. 初始化项目
2. 安装eslint模块为开发依赖
3. 通过cli命令验证安装结果
4. yarn eslint --version
5. yarn eslint // 做检查


# Eslint快速上手
1. 使用eslint检测
2. 完成eslint使用配置
3. npm init @eslint/config
    - to check syntax only 检查语法错误
    - to check syntax and find problems
    - to check syntax, find problems, and enforce code style
4. what type of modules does your project use?
   JavaScript modyles
   Commonjss 
   none of these
5. use a popular style guide
    - airbnb:
    - standard *
6. what format do you want your config file  to be in?
    - javaScript
7. yarn eslint // 做检查
8. yarn eslint --fix


# Eslint 配置文件解析

# Eslint配置注释

# Eslint集成构建工具

# Stylelint 

# Prettier
1. yarn add prettier

# git hooks介绍
1. git hook 也成为git钩子，每个钩子都对应一个任务
2. 通过shell脚本可以编写钩子任务触发时要具体执行的操作


# husky实现git hooks的使用需求，不用编写sheel


# lint-stage
1. yarn add lint-staged -D
2. "husky": {
    "hooks": {
      "pre-commit": "npm run precommit"
    }
  },
  "lint-staged": {
    "*.js": [
      "eslint",
      "git add"
    ]
  }
  "scripts": {
    "test": "eslint ./",
    "precommit": "lint-staged"
  },

















