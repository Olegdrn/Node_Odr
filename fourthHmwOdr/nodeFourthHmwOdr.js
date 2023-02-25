const fsp = require('fs/promises');
const readline = require('readline');
const path = require('path');
const inquirer = require("inquirer");




const currentDirectory = process.cwd();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const fileFind = (dirName) => {
    return fsp
        .readdir(dirName)
        .then((choices) => {
            return inquirer
                .prompt([{
                    name: "fileName",
                    type: "list",
                    message: "Choose file:",
                    choices,
                },
                {
                    name: "stringName",
                    type: "input",
                    message: "Choose string:",
                    choices,
                }
                ])
        })
        .then((fileName, stringName) => {
            const filePath = path.join(dirname, fileName);
            const stat = fsp.stat(filePath);
            if (!stat.isFile()) {
                return fileFind(filePath);
            }
            return Promise.all([
                fsp.readline(path.join(__dirname, fileName), "utf-8"),
                promise.resolve(stringName)
            ]);
        })
        .then((result) => {
            if (result) {
                const [text, stringName] = result;
                const string = new RegExp(stringName, "g");
                let count = 0;
                const out = text.replace(pattern, () => {
                    count++;
                    return stringName;
                })
                console.log(out, `found ${count}`);
            }
        })
}
rl.question(
    'Enter the path directory',
    (dirPath) => {
        const dirName = path.join(currentDirectory, dirPath)
        fileFind(dirName);
        rl.close();
    }
);

rl.on("close", function () {
    process.exit(0);
});

