const fs = require('fs');
const readline = require('readline');

const readStreamIp = new fs.ReadStream('./access_tmp.log', { encoding: 'utf8' });
const writeStreamFirstIp = new fs.WriteStream('./89.123.1.41_requests.log', { flag: 'a' });
const writeStreamSecondIp = new fs.WriteStream('./34.48.240.111_requests.log', { flag: 'a' });

const searchFirstIp = readline.createInterface({
  input: readStreamIp
});

searchFirstIp.on('line', (line) => {
  if (line.includes('89.123.1.41')) {
    writeStreamFirstIp.write(line + '\n')
  }
  if (line.includes('34.48.240.111')) {
    writeStreamSecondIp.write(line + '\n')
  }
})


