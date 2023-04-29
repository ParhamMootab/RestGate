import { frameworkDropdown } from "./FrameworkDropdown";
import { methodDropdown } from "./MethodDropdown";
import { taskDropdown } from "./TaskDropdown";

export const form = /* html */ `<form>
<div class="gridItem">
  <label for="task" id="taskLbl">
    What do you want to do?
  </label>
  ${taskDropdown}
</div>
<div class="gridItem">

  <label for="framework" id="frameworkLbl">
    Using:
  </label>
  ${frameworkDropdown()}

  <label for="method" id="methodLbl">
    Method:
  </label>
  ${methodDropdown}

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

</form>`;
