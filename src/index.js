'use strict';

var toArgv   = require('argv-formatter').format;
var Promise  = require('bluebird');
var child    = Promise.promisifyAll(require('child_process'));
var camelize = require('camelize');

exports.run = function (command, args, options) {
  options = options || {};
  if (typeof args === 'string') {
    args = [args];
  }
  else if (!Array.isArray(args)) {
    args = args ? toArgv(args) : [];
  }
  var childArgs = ['git', [command].concat(args)];
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
