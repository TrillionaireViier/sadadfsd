const { spawn } = require('child_process');
const fs = require('fs');

const out = fs.openSync('./next.log', 'a');
const err = fs.openSync('./next.err', 'a');

const child = spawn('npm', ['run', 'dev'], {
  detached: true,
  stdio: ['ignore', out, err]
});

child.unref();
console.log('Next.js started with PID:', child.pid);
