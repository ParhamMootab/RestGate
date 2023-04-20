import * as vscode from "vscode";
import { getUri } from "../utils/getUri";
import { getNonce } from "../utils/getNonce";

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
      const cspSource = {
        "Content-Security-Policy":
          "default-src 'none'; style-src 'unsafe-inline';",
      };
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
        const text = message.text;

        switch (command) {
          case "howdy":
            vscode.window.showInformationMessage(text);
            return;
        }
      },
      undefined,
      this._disposables
    );
  }

  private _getWebViewContent(
    webview: vscode.Webview,
    extensionUri: vscode.Uri
  ) {
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
          <title>Hello World!</title>
          <link type="text/css" rel="stylesheet" href="${stylesUri}">
        </head>
        <body>
          <div id="container">
            <form>
              <div class="gridItem">
                <label for="task" id="taskLbl">
                  What do you want to do?
                </label>
                <vscode-dropdown id="task">
                  <vscode-option selected value="route">Generate a new route</vscode-option>
                  <vscode-option value="db">Generate a new database query</vscode-option>
                </vscode-dropdown>
              </div>
              <div class="gridItem">
                <label for="task" id="frameworkLbl">
                  Using:
                </label>
                <vscode-dropdown id="framework">
                  <vscode-option value="django">Django</vscode-option>
                  <vscode-option value="flask">Flask</vscode-option>
                  <vscode-option value="fastApi">FastAPI</vscode-option>
                  <vscode-option value="express">Express.js</vscode-option>
                </vscode-dropdown>

                <label for="method" id="methodLbl">
                  Method:
                </label>
                <vscode-dropdown id="method">
                  <vscode-option value="get">GET</vscode-option>
                  <vscode-option value="post">POST</vscode-option>
                  <vscode-option value="patch">PATCH</vscode-option>
                  <vscode-option value="delete">DELETE</vscode-option>
                </vscode-dropdown>
              </div>
              <div class="gridItem">
                <vscode-button id="generateBtn"> Generate Snippet > </vscode-button>
              </div>
              
              <div class="gridItem">
                <vscode-text-area placeholder="Code..." resize="vertical" id="codeTextArea">
                </vscode-text-area>
              </div>

              <div class="gridItem">
                <vscode-button id="copyBtn"> Copy </vscode-button>
              </div>

            </form>
          </div>
          
          <script type="module" nonce="${nonce}" src="${webviewUri}"></script>
        </body>
      </html>
    `;
  }
}
