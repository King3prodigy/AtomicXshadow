
const { spawn } = require('child_process');
const path = require('path');
function start() {
   let p = spawn(process.argv[0], [path.join(__dirname, 'main.js'), ...process.argv.slice(2)], {
      stdio: ['inherit', 'inherit', 'inherit', 'ipc']
   })
   .on('message', data => data === 'reset' && (p.kill(), start(), delete p))
   .on('exit', code => ['.', 1, 0].includes(code) && start());
}
start();