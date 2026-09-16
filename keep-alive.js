const { spawn } = require('child_process');

const next = spawn('npm', ['run', 'dev:all'], { stdio: 'inherit' });

next.on('close', (code) => {
  console.log('npm run dev:all exited with code', code);
  process.exit(code);
});

setInterval(() => {}, 1000 * 60 * 60);
