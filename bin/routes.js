#!/usr/bin/env node --harmony

var chalk = require('chalk');
var nopt = require('nopt');
var path = require('path');
var Helper = require('../lib');

var knownOpts = {
  'filter-by': String,
  'adapter': String,
  'interactive': Boolean,
  'help': Boolean,
  'routes': path
};

var shortHands = {
  'i': ['--interactive'],
  'h': ['--help']
};

var parsed = nopt(knownOpts, shortHands, process.argv, 2);
var adapter = parsed.adapter || 'koa';
var filterBy = parsed['filter-by'];
var argv = parsed.argv.remain || [];
var routesFile = parsed.routes || path.join(process.cwd(), 'routes');
var helper = Helper(adapter);

if (parsed.help) {
  require('./help')();
  process.exit();
}

var regexp = new RegExp(argv.join('|'));
var test = regexp.test.bind(regexp);

try {
  require(routesFile)(helper.app());
} catch (e) {
  console.log();
  console.log('  File not found. %s', routesFile);
  console.log();
  process.exit(1);
}

var routes = helper.filter(function (route) {
  var str;

  if (filterBy) {
    str = route[filterBy];
  } else {
    str = JSON.stringify(route);
  }

  return test(str);
});

function table(arr) {
  var len = {};

  arr.forEach(function (item) {
    Object.keys(item).forEach(function (name) {
      var n = len[name] | 0;
      var cn = item[name].length;

      if (n <= cn) {
        len[name] = cn;
      }
    });
  });

  arr.forEach(function (item) {
    Object.keys(item).forEach(function (name) {
      var n = len[name] | 0;
      var cn = item[name].length;
      var spaces = ' '.repeat(n - cn);
      item[name] += spaces;
    });
  });
}

function printRoute(route) {
  console.log('  %s\t%s\t%s'
    , chalk.cyan(route.name)
    , chalk.magenta(route.path)
    , route.middleware);
}

console.log();

if (routes.length) {
  table(routes);
  routes.forEach(printRoute);
} else {
  console.log('  empty~');
}

console.log();
