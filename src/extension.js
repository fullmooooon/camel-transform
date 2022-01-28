const vscode = require('vscode')

/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */
exports.activate = function (context) {
    console.log('恭喜，您的扩展“vscode-plugin-demo”已被激活！')
    // 注册命令
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.sayHello', async () => {
            const start = vscode.window.activeTextEditor.selection.start
            const end = vscode.window.activeTextEditor.selection.end
            const range = new vscode.Range(start, end)
            const currentText = vscode.window.activeTextEditor.document.getText(range)
            let arr = currentText.match(/[A-Z]*[^A-Z]+/g)
            arr = arr.map((v) => v.toLocaleLowerCase())
            const targetText = arr.join('-')
            await vscode.window.activeTextEditor.edit((editBuilder) => {
                editBuilder.replace(range, targetText)
            })
        })
    )
}

/**
 * 插件被释放时触发
 */
exports.deactivate = function () {
    console.log('您的扩展“vscode-plugin-demo”已被释放！')
}
