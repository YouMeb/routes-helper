'use strict';

function getName(fn) {
  return fn.name;
}

exports.toRoute = function () {
  var args = Array.prototype.slice.call(arguments);
  var name = args.shift();
  var route = args.shift();
  var middleware = args;
  
  return {
    name: name,
    path: route,
    middleware: middleware.map(getName).join(', ')
  };
};
