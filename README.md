git-child [![Build Status](https://travis-ci.org/bendrucker/git-child.svg?branch=master)](https://travis-ci.org/bendrucker/git-child)
=========

Node utility for running `git` commands via the command line via [`child_process`](http://nodejs.org/api/child_process.html). 

## Installing

```bash
$ npm install git-child
```

## API

##### `git.run(command, args, options)` -> `promise`

`git.run` is the low level command that controls creating a child process and returning its output from `stdout` as a promise. `command` is a git command, like `'log'`. `args` can be an `Array` of arguments to be passed to git (`git.run('log', ['-a'])`) or an object to be passed to [argv-formatter](https://github.com/bendrucker/argv-formatter) (`git.run('log', {a: true})`). If `options.spawn` is `true`, the promise will resolve the `ChildProcess` instance so you can manually interact with the stdio streams. Otherwise, it buffers `stdout` using `child_process.execFile` and resolves `stdout`. 

### Git Commands

git-child creates sugar methods for all known git methods.

```js
// log the last 3 commits
git.log({
  n: 3
})
.then(console.log);
```

Methods with dashes will be camel cased, so `git add--interactive` becomes `git.addInteractive`. To update the list of commands, run `npm run commands`.
