'use strict';

var chai   = require('chai')
var sinon  = require('sinon');
var child  = require('child_process');
var git    = require('../');

var expect = chai
  .use(require('chai-as-promised'))
  .use(require('sinon-chai'))
  .expect;

describe('git-child', function () {

  var sandbox;
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    sandbox.stub(child, 'spawn');
    sandbox.stub(child, 'execFile');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('can use an argv array', function () {
    git.log(['-a']);
    expect(child.execFile).to.have.been.calledWith('git', ['log', '-a']);
  });

  it('can use an argv object', function () {
    git.log({a: true});
    expect(child.execFile).to.have.been.calledWith('git', ['log', '-a']);
  });

  it('can use no args', function () {
    git.log();
    expect(child.execFile).to.have.been.calledWith('git', ['log']);
  });

  it('can resolve a spawn', function () {
    var spawn = {};
    child.spawn.returns(spawn);
    return git.log(undefined, {spawn: true})
      .then(function (process) {
        expect(child.spawn).to.have.been.calledWith('git', ['log']);
        expect(process).to.equal(spawn);
      });
  });

  it('resolves stdout', function () {
    child.execFile.yields(null, 'stdout', 'stderr');
    return git.log()
      .then(function (stdout) {
        expect(stdout).to.equal('stdout');
      });
  });

});
