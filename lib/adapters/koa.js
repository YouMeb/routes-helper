'use strict';

function getName(fn) {
  return fn.name;
}

exports.toRoute = function () {
  var args = Array.prototype.slice.call(arguments);
  var method = args.shift();
  var name = args.shift();
  var route = args.shift();
  var middleware = args;
  
  return {
    method: method,
    name: name,
    path: route,
    middleware: middleware.map(getName).join(', ')
  };
};
