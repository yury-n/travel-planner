const object = require('lodash/object');
const User = require('../models/user');

function getUsers(req, res) {
  const query = User.find({}).select('name role')
  query.exec((err, users) => {
    res.json(users);
  });
}

function registerUser(req, res) {
  const newUser = new User({
    name: req.body.name,
    password: req.body.password,
    role: 'regular'
  });
  newUser.save((err, user) => {
    if (err) {
      // TODO
    } else {
      res.json({
        message: `Welcome, ${user.name}!`,
        user: object.pick(user, ['_id', 'name', 'role'])
      });
    }
  });
}

module.exports = { getUsers, registerUser };
