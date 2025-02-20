/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const process = require("process");

// program.version("1.0.0");

const generateFile = (folderValue, folderPath, _fileName, rootPath) => {
  for (const j in folderValue) {
    const action = folderValue[j];

    const mockup = fs.readFileSync(path.join(rootPath, action), {
      encoding: "utf8",
    });
    const mockupName = path.basename(path.join(rootPath, action));

    const nameInsideFile = _fileName
      .split("-")
      .map((word, i) => {
        if (i === 0 && word === "class") {
          return "";
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("");
    const file = mockup.replace(/__name__/g, nameInsideFile);
    const fileName = mockupName
      .replace(".mock", "")
      .replace(/__name__/g, _fileName);
    const fFile = path.join(folderPath, fileName);

    fs.writeFileSync(fFile, file);
  }
};

const recursiveDir = (templates, directoryPath, fileName, rootPath) => {
  const templatesData = Object.entries(templates);

  for (const r in templatesData) {
    const folderName = templatesData[r][0].replace(/__name__/g, fileName);
    const folderValue = templatesData[r][1];

    // Create Dir
    console.log("Create Directory");
    const folderPath = path.join(directoryPath, folderName);
    fs.mkdirSync(folderPath, {recursive: true});

    if (Array.isArray(folderValue)) {
      generateFile(folderValue, folderPath, fileName, rootPath);
    } else {
      recursiveDir(folderValue, folderPath, fileName, rootPath);
    }
  }
};

const command = () => {
  const currentDir = process.cwd();
  const _command = process.argv[2] ?? null;
  const _name = process.argv[3] ?? null;
  const _path = process.argv[4] ?? null;

  if (!_name || !_path) {
    console.error("Wrong command!!!", _name, _path);
    return;
  }

  const config = fs.readFileSync(
    path.join(currentDir, "src/scripts/create/create.config.json"),
    {
      encoding: "utf8",
    },
  );

  const configJson = JSON.parse(config);
  const currentDirBase = path.join(currentDir, configJson.base);
  const mockDirBase = path.join(currentDir, "./src/scripts/create");
  const listCommands = Object.entries(configJson.commands);

  for (const i in listCommands) {
    const command = listCommands[i][0];
    const templates = listCommands[i][1];

    if (command !== _command) continue;

    console.log(`Create a ${command} template file`);
    const directoryPath = path.join(currentDirBase, _path);

    if (!Array.isArray(templates)) {
      recursiveDir(templates, directoryPath, _name, mockDirBase);
    } else {
      generateFile(templates, directoryPath, _name, mockDirBase);
    }
    console.log(`Component file created: ${_name}`);
  }
};

command();
