import Watcher from './watcher'

class Compiler {
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        // 开始编译模版
        this.compile(this.el)
    }

    // 编译模版，处理文本节点和元素节点
    compile(el) {
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            // 处理文本节点
            if (this.isTextNode(node)) {
                this.compileText(node)
            }
            if (this.isElementNode(node)) {
                // 处理元素节点
                this.compileElement(node)
            }
            // 判断node节点，是否有子节点；递归调用compile
            if (node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })
    }

    // 编译元素节点，处理指令
    compileElement(node) {
        // 拿到属性节点, 遍历
        Array.from(node.attrbutes).forEach(attr => {
            // 判断是否是指令
            let attrName = attr.name
            if (this.isDirective(attrName)) {
                // v-text --> text
                attrName = attrName.substr(2)
                const key = attr.value
                this.update(node, key, attrName)
            }
        })
    }

    update(node, key, arrtName) {
        let updateFn = this[arrtName + 'Updater']
        updateFn && updateFn.call(this, node, this.vm[key], key) // this指向问题
    }

    // 处理v-text 指令
    textUpdater(node, value, key) {
        node.textContent = value
        new Watcher(this.vm, key, newValue => {
            node.textContent = newValue
        })
    }

    // v-model
    modelUpdater(node, value, key) {
        node.value = value
        new Watcher(this.vm, key, newValue => {
            node.value = newValue
        })
        // 双向数据绑定
        node.addEventListener('input', () => {
            this.vm[key] = node.value
        })
    }

    // 编译文本节点，处理插值表达式
    compileText(node) {
        // console.dir(node) // 以对象形式打印node
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if (reg.text(value)) {
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])

            // 创建watcher对象，当数据改变更新视图
            new Watcher(this.vm, key, newValue => {
                node.textContent = newValue
            })
        }
    }

    // 判断元素属性是否是指令
    isDirective(attrName) {
        return attrName.startsWith('v-')
    }

    // 判断节点是否文本节点
    isTextNode(node) {
        return node.nodeType === 3
    }

    // 判断节点是否是元素节点
    isElementNode(node) {
        return node.nodeType === 1
    }
}

export default Compiler
