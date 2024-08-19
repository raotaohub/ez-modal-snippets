// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import presetSnippets from './snippets/preset.json'
import { ISnippet } from './type'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  const { showQuickPick, activeTextEditor } = vscode.window

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  const disposable = vscode.commands.registerCommand(
    'ez-modal-snippets.search',
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user

      const snippetsArray = Object.entries(presetSnippets) as [
        string,
        ISnippet
      ][]

      const rawSnippet = await showQuickPick(
        snippetsArray.map(([key, value]) => ({
          label: value.prefix,
          description: value.description,
          body: value.body.join('\n'),
        })),
        {
          matchOnDescription: true,
          matchOnDetail: true,
          placeHolder: 'choice or search',
        }
      )

      if (activeTextEditor) {
        activeTextEditor.insertSnippet(
          new vscode.SnippetString(
            new vscode.SnippetString(rawSnippet?.body).value
          )
        )
      }
    }
  )

  context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
export function deactivate() {}
