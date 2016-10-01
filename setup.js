const passwordHash = require('password-hash');
const mongoose = require('./mongoose');
const config = require('config');
const User = require('./app/models/user');
const Permission = require('./app/models/permission');

(() => {
  // User.remove({}, process.exit); return;
  // Permission.remove({}, process.exit); return;

  User.create([
    {name: 'root', password: passwordHash.generate('password'), role: 'superadmin'}
  ]).then(() =>
    Permission.create([
      {role: 'regular', action: 'manageOwnTravels'},

      {role: 'admin', action: 'manageUsers'},
      {role: 'admin', action: 'manageOwnTravels'},

      {role: 'superadmin', action: 'manageUsers'},
      {role: 'superadmin', action: 'manageAnyTravels'},

    ]).then(process.exit)
  );

})();
