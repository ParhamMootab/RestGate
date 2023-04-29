import {
  provideVSCodeDesignSystem,
  vsCodeButton,
  vsCodeDropdown,
  vsCodeOption,
  vsCodeTextArea
} from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(
  vsCodeButton(),
  vsCodeDropdown(),
  vsCodeOption(),
  vsCodeTextArea()
);
const vscode = acquireVsCodeApi();
window.addEventListener("load", main);

function main() {
  const generateBtn = document.querySelector("#generateBtn");
  generateBtn?.addEventListener("click", handleGenerateBtn);
}

const handleGenerateBtn = () => {
  const codeTextArea = document.querySelector("#codeTextArea") as HTMLTextAreaElement
  codeTextArea.value = "hey there"
  // const selectedFramework = (document.querySelector("#framework") as HTMLSelectElement).value;
  // vscode.postMessage({
  //   command: "generateCodeBtn",
  //   framework: selectedFramework
  // });
};
