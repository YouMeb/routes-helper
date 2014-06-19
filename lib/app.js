'use sreuct';

var methods = require('methods');

module.exports = App;

function App(adapter) {
  this.adapter = adapter;
  this.routes = [];
}

function createMethod(name) {
  return function () {
    Array.prototype.unshift.call(arguments, name);
    var route = this.adapter.toRoute.apply(this, arguments);
    this.routes.push(route);
  };
}

methods.forEach(function (name) {
  var method = createMethod(name);
  App.prototype[name] = method;
});
