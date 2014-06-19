'use strict';

var App = require('./app');

module.exports = Helper;

Helper.adapters = require('./adapters');

function Helper(adapter) {
  if (!(this instanceof Helper)) {
    return new Helper(adapter);
  }

  if (typeof adapter === 'string') {
    adapter = Helper.adapters[adapter];
  }

  this.routes = [];
  this.adapter = adapter;
}

Helper.prototype.app = function () {
  var app = new App(this.adapter);
  app.routes = this.routes;
  return app;
};

Helper.prototype.filter = function (fn) {
  return this.routes.filter(fn);
};
