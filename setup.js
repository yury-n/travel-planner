process.env.NODE_ENV = 'test';

const passwordHash = require('password-hash');
const mongoose = require('./mongoose');
const config = require('config');
const User = require('./app/models/user');
const Permission = require('./app/models/permission');

function createRootUser() {
  return User.create([
    {name: 'root', password: passwordHash.generate('password'), role: 'superadmin'}
  ]);
}

function createPermissions() {
  return Permission.create([
    {role: 'regular', action: 'manageOwnTravels'},

    {role: 'admin', action: 'manageUsers'},
    {role: 'admin', action: 'manageOwnTravels'},

    {role: 'superadmin', action: 'manageUsers'},
    {role: 'superadmin', action: 'manageAnyTravels'},
  ]);
}

function deleteAllUsers() {
  return User.remove({});
}

function deleteAllPermissions() {
  return Permission.remove({});
}

deleteAllUsers()
  .then(createRootUser)
  .then(deleteAllPermissions)
  .then(createPermissions)
  .then(process.exit);
