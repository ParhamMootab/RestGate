export function frameworkDropdown() {
  const frameworks: Array<string> = ["Django", "Flask", "FastAPI"];
  

  let html = /*HTML*/ `
  <vscode-dropdown id="framework">
    <vscode-option value="django">Django</vscode-option>
    <vscode-option value="flask">Flask</vscode-option>
    <vscode-option value="fastApi">FastAPI</vscode-option>
    <vscode-option value="express">Express.js</vscode-option>
  </vscode-dropdown>`;
  return html;
}
