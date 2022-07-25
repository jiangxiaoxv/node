
# Yeoman
1. yarn global add yo
2. yarn add generator-node
3. yo node
4. 在cli / my-module 生成了一个node项目
5. yo node:cli

# 自定义generator
1. 创建一个generator就是一个npm包
2. 有对应的结构
3. generator-<name> // generator-sample

# plop 生成器
1. yarn add plop -D
2. 根目录下新建一个plopfile.js
3. 文件里写入 module.exports = plop => {
    plop.setGenerator('component', {
        description: '',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'component name',
                default: 'MyComponent'
            }
        ],
        actions: [
            {
                type: 'add', // 添加文件
                path: `src/components/{{name}}/{{name}}.js`,
                templateFile: '
            }
        ]
    })
}

# 自己实现一个cli
1. mkdir sample-scaffolding
2. yarn add ejs
3. yarn add inquirer