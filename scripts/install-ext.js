const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const extensionsListPath = path.resolve(
  __dirname,
  "..",
  "..",
  ".vscode",
  "extensions.json"
);

function getRecommendedExtensionsList() {
  const data = fs.readFileSync(extensionsListPath, {
    encoding: "utf8",
    flag: "r",
  });

  return JSON.parse(data).recommendations;
}

function installExtensions() {
  const recommendedExtensionsList = getRecommendedExtensionsList();

  for (const extensionId of recommendedExtensionsList) {
    exec(`code --install-extension ${extensionId}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        console.log(
          "Maybe you are using WSL? So install recommended extensions by yourself please."
        );
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }
}

installExtensions();
