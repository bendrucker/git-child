'use strict';

var toArgv   = require('argv-formatter').format;
var Promise  = require('bluebird');
var child    = Promise.promisifyAll(require('child_process'));
var camelize = require('camelize');

exports.run = function (command, args, options) {
  options = options || {};
  var childArgs = ['git', [command].concat(toArgv(args))];
  if (options.spawn) {
    return Promise.resolve(child.spawn.apply(child, childArgs));
  }
  else {
    return child.execFileAsync.apply(child, childArgs).get(0);
  }
};

require('./commands.json').forEach(function (command) {
  var method = camelize(command).replace('-', '');
  exports[method] = function (args, options) {
    return exports.run(command, args, options);
  };
});
