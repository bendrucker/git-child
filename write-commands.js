'use strict';

var Promise = require('bluebird');
var git     = require('./');
var fs      = Promise.promisifyAll(require('fs'));

git.run('help', {
  a: true
})
.then(function (stdout) {
  var start = stdout.match(/available git commands in \'.+\'/);
  var end = 'git commands available from elsewhere on your $PATH';

  return stdout
    .substring(start.index + start[0].length, stdout.indexOf(end))
    .trim()
    .split(/\s+/);
})
.then(function (commands) {
  return fs.writeFileAsync('./src/commands.json', JSON.stringify(commands, undefined, 2));
});
