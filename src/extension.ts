import * as vscode from "vscode";
import { findFramework } from "./utils/getFramework";
import * as fs from 'fs'
import * as path from 'path';
import { GenerateCodePanel } from "./panels/GenerateCodePanel";

const frameworks: Array<string> = ["Django", "Flask", "FastAPI"];

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "restgate.start",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(
          editor.document.uri
        );

        if (workspaceFolder) {
          const frameworkUsed: string | undefined = findFramework(
            workspaceFolder.uri.fsPath,
            frameworks
          );
        } 
      }

      GenerateCodePanel.render(context.extensionUri)
      
      

      // let postEndpoint: string =
      //   "@app.route('/', methods=['POST']) \n \t def hello_world():";
      // const postSnippet = new vscode.SnippetString(postEndpoint);

      // vscode.window.activeTextEditor?.insertSnippet(postSnippet);
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
