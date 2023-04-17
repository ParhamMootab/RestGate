import * as path from "path";
import * as fs from "fs";

export function findFramework(
  workspacePath: string,
  frameworks: Array<string>
): any {
  const requirementsFilePath = path.join(workspacePath, "requirements.txt");

  frameworks.forEach((framework) => {
    if (fs.existsSync(requirementsFilePath)) {
      const requirementsFileContent = fs.readFileSync(
        requirementsFilePath,
        "utf-8"
      );
      if (requirementsFileContent.includes(framework)) return framework;
    }

    const setupFilePath = path.join(workspacePath, "setup.py");
    if (fs.existsSync(setupFilePath)) {
      const setupFileContent = fs.readFileSync(setupFilePath, "utf-8");
      if (setupFileContent.includes(framework)) return framework;
    }

    const setupCfgFilePath = path.join(workspacePath, "setup.cfg");
    if (fs.existsSync(setupCfgFilePath)) {
      const setupCfgFileContent = fs.readFileSync(setupCfgFilePath, "utf-8");
      if (setupCfgFileContent.includes(framework)) return framework;
    }
  });
}
