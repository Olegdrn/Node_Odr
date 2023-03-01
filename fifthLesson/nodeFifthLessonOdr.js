const http = require('http');
const path = require('path');
const { Transform } = require("stream");
const { stat } = require('fs');
const os = require('os');
const fs = require('fs');

const numCPUs = os.cpus().length;
console.log(numCPUs)

const host = 'localhost';
const port = 3000;
const currentDirectory = process.cwd();

const links = (arr, curUrl) => {
  if (curUrl.endsWith('/')) {
    curUrl = curUrl.substring(0, curUrl.length - 1);
  }
  let li = '';
  for (const item of arr) {
    li += `<li><a href="${curUrl}/${item}">${item}</a></li>`;
  }
  return li;
};

const server = http.createServer((request, response) => {
  if (request.method === 'GET') {
    const url = request.url.split("?")[0];
    const curPath = path.join(currentDirectory, url)

    stat(curPath, (err, stats) => {
      if (!err) {
        if (stats.isFile(curPath)) {
          const rs = fs.createReadStream(curPath, "utf-8");
          rs.pipe(response);
        } else {
          fs.promises
            .readdir(curPath)
            .then((data) => {
              const filePath = path.join(currentDirectory, "./index.html");
              const rs = fs.createReadStream(filePath);
              const ts = new Transform({
                transform(chunk, encoding, callback) {
                  const li = links(data, url);
                  this.push(chunk.toString().replace("#filelinks#", li));
                  callback();
                }
              });
              rs.pipe(ts).pipe(response);
            })
        }
      } else {
        response.end("Wrong path");
      }
    })
  }
})

server.listen(port, host, () => {
  console.log(`Server http://${host}:${port}`)
});
