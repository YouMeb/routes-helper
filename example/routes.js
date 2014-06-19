'use strict';

function *member() {}
function *isAdmin() {}

module.exports = function (app) {
  app.get('home', '/', member);
  app.get('login', '/login', member);
  app.post('login', '/login', member);
  app.get('register', '/register', member);
  app.post('register', '/register', member);

  app.get('admin-home', '/admin', member, isAdmin);
  app.get('admin-users-list', '/admin/users', member, isAdmin);
  app.get('admin-users-update', '/admin/users/update/:uid', member, isAdmin);
  app.post('admin-users-update', '/admin/users/update/:uid', member, isAdmin);
};
