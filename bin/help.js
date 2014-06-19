'use strict';

var chalk = require('chalk');
var pkg = require('../package');

module.exports = function () {
  console.log();
  console.log('  %s@%s', chalk.cyan(pkg.name), chalk.cyan(pkg.version));
  console.log('  http://github.com/youmeb/routes-helper');
  console.log();
  console.log('  Options:');
  console.log();
  console.log('    --help, -h');
  console.log('    --interactive, -i');
  console.log();
};
