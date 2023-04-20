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
  const howdyBtn = document.querySelector("#howdy");
  howdyBtn?.addEventListener("click", handleHowdyBtn);
}

const handleHowdyBtn = () => {
  vscode.postMessage({
    command: "howdy",
    text: "Hey there partner",
  });
};
