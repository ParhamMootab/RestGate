import * as vscode from "vscode";
import { findFramework } from "./utils/getFramework";
import * as fs from 'fs'
import * as path from 'path';
import { GenerateCodePanel } from "./panels/GenerateCodePanel";

const frameworks: Array<string> = ["Django", "Flask", "FastAPI"];

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "restgate.helloWorld",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No file is currently open");
        return;
      }

      const workspaceFolder = vscode.workspace.getWorkspaceFolder(
        editor.document.uri
      );
      if (!workspaceFolder) {
        vscode.window.showErrorMessage("No workspace folder found");
        return;
      }

      const frameworkUsed: string | undefined = findFramework(
        workspaceFolder.uri.fsPath,
        frameworks
      );
      // if (!frameworkUsed) {
      //   vscode.window.showErrorMessage("Framework not recognized");
      //   return;
      // }

      // const panel = vscode.window.createWebviewPanel(
      //   "generatePanel",
      //   "Generate Snippet",
      //   vscode.ViewColumn.One,
      //   {}
      // );

      // const panelHtml = fs.readFileSync(path.join(__dirname, 'view', 'panel.html'), 'utf-8');
      // const panelScriptUri = vscode.Uri.file(path.join(__dirname, 'view', 'index.js'));
      // const panelScriptSrc = panel.webview.asWebviewUri(panelScriptUri);
      // const scriptTag = `<script src="${panelScriptSrc}"></script>`;
      // const panelHtmlWithScript = panelHtml.replace('<script src="panel.js"></script>', scriptTag);

      // panel.webview.html = panelHtmlWithScript;
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
