import * as vscode from "vscode";
import { getUri } from "../utils/getUri";
import { getNonce } from "../utils/getNonce";
import { form } from "./Components";

export class GenerateCodePanel {
  public static currentPanel: GenerateCodePanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = this._getWebViewContent(
      this._panel.webview,
      extensionUri
    );
    this._setWebviewMessageListener(this._panel.webview);
  }

  public static render(extensionUri: vscode.Uri) {
    if (GenerateCodePanel.currentPanel) {
      GenerateCodePanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
    } else {
      const panel = vscode.window.createWebviewPanel(
        "hello-world",
        "Hello World",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [vscode.Uri.joinPath(extensionUri, "out")],
        }
      );

      GenerateCodePanel.currentPanel = new GenerateCodePanel(
        panel,
        extensionUri
      );
    }
  }

  public dispose() {
    GenerateCodePanel.currentPanel = undefined;
    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) disposable.dispose();
    }
  }

  private _setWebviewMessageListener(webview: vscode.Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command;

        switch (command) {
          case "generateCodeBtn":
            vscode.window.showInformationMessage("hey 123");
            return;
        }
      },
      undefined,
      this._disposables
    );
  }

  private _getWebViewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
    const nonce = getNonce();
    const webviewUri = getUri(webview, extensionUri, ["out", "webview.js"]);
    const stylesUri = getUri(webview, extensionUri, ["out", "styles.css"]);

    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="default-src 'self' ${webview.cspSource}; script-src 'nonce-${nonce}';  style-src ${webview.cspSource} ${stylesUri};style-src-elem 'self' ${webview.cspSource};">
          <title>RestGate</title>
          <link type="text/css" rel="stylesheet" href="${stylesUri}">
        </head>


        <body>
          <div id="container">

            ${form}

          </div>
          <script type="module" nonce="${nonce}" src="${webviewUri}"></script>
        </body>
      </html>
    `;
  }
}
