const fs = require('fs');
const dir = __dirname

console.log("dir", dir)

fs.rmSync(`${dir}/build`, { recursive: true, force: true });
fs.rmSync(`${dir}/build.zip`, { recursive: true, force: true });