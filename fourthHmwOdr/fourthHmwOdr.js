#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const yards = require('path');
const rl = require("readline");
const options = yards
  .usage("Usage: -p <path>")
  .option("p", {
    alias: "path", describe: "Path to file", type: "string",
    demandOption: true
  })
  .argv;

const filePath = path.join(__dirname, options.path);
fs.readFile(filePath, 'utf8', (err, data) => {
  console.log(data);
});
