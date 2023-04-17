import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";


provideVSCodeDesignSystem().register(vsCodeButton());
const vscode = acquireVsCodeApi()
window.addEventListener("load", main)

function main(){
    const howdyBtn = document.querySelector('#howdy');
    howdyBtn?.addEventListener("click", handleHowdyBtn)
}

const handleHowdyBtn = () => {
    vscode.postMessage({
        command: "howdy",
        text: "Hey there partner"
    })
}