'use strict';

var helper = require('../lib')('koa');
var routes = require('./routes');

routes(helper.app());

var routes = helper.filter(function (route) {
  return /^admin-/.test(route.name);
});

console.log(routes);
