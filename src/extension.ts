// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "restgate" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('restgate.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from RestGate bitchesss!');
	});

	context.subscriptions.push(disposable);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "rest-gate" is now active!');
	vscode.window.showInformationMessage("Hello world bitches")
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('rest-gate.post-endpoint', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		let postEndpoint: string = "@app.route('/', methods=['POST']) \n \t def hello_world():"
		const postSnippet = new vscode.SnippetString(postEndpoint)

		vscode.window.activeTextEditor?.insertSnippet(postSnippet);
	});
}

// This method is called when your extension is deactivated
export function deactivate() {}
