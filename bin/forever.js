var forever = require('forever-monitor');

const MAX_ATTEMPTS = 5;

var child = new (forever.Monitor)('www.js', {
  max: MAX_ATTEMPTS,
  silent: true,
  args: []
});

child.on('exit', function () {
  console.log(`Express server has exited after ${MAX_ATTEMPTS} restarts`);
});

child.start();