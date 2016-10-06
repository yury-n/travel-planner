//process.env.NODE_ENV = 'test';

const passwordHash = require('password-hash');
const mongoose = require('./mongoose');
const config = require('config');
const User = require('./server/models/user');
const Permission = require('./server/models/permission');

function createRootUser() {
  return User.create([
    {name: 'root', password: passwordHash.generate('pass'), role: 'superadmin'}
  ]);
}

function createRegularUsers() {
  return User.create([
    {name: 'John', password: passwordHash.generate('123'), role: 'regular'},
    {name: 'Keith', password: passwordHash.generate('321'), role: 'regular'}
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
  .then(createRegularUsers)
  .then(deleteAllPermissions)
  .then(createPermissions)
  .then(process.exit);
