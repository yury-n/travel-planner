const object = require('lodash/object');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('config');
const validateRequiredFields = require('../utils/validateRequiredFields');
const endWithServerError = require('../utils/endWithServerError');
const User = require('../models/user');

exports.getUsers = (req, res) => {
  const query = User.find({}).select('name role');
  query.exec((err, users) => {
    res.json(users);
  });
};

exports.registerUser = (req, res) => {
  if (!validateRequiredFields(req, res, ['name', 'password'])) {
    return;
  }
  const name = req.body.name;
  const password = req.body.password;

  User.findOne({name: name}, (err, doc) => {
    if (doc !== null) {
      res.status(400);
      res.json({message: 'Requested name is taken.'});
      return;
    }
    const newUser = new User({
      name: name,
      password: passwordHash.generate(password),
      role: 'regular'
    });
    newUser.save((err, user) => {
      if (err) {
        return endWithServerError(res, 'DB failure.');
      }
      res.json({
        message: `Welcome, ${user.name}!`,
        user: object.pick(user, ['_id', 'name', 'role'])
      });
    });
  });

};

exports.authenticateUser = (req, res) => {
  if (!validateRequiredFields(req, res, ['name', 'password'])) {
    return;
  }
  User.findOne({name: req.body.name}, 'name role', (err, user) => {
    if (err) {
      return endWithServerError(res, 'DB failure.');
    }
    if (!user) {
      res.status(401);
      res.json({message: 'Authentication failed. User not found.'});
      return;
    }
    if (!passwordHash.verify(req.body.password, user.password)) {
      res.status(401);
      res.json({message: 'Authentication failed. Wrong password.'});
      return;
    }
    const authtoken = jwt.sign(
      user,
      config.appSecretKey,
      {expiresIn: '24 hours'}
    );

    res.json({
      authtoken: authtoken,
      user: object.pick(user, ['_id', 'name', 'role'])
    });
  });
};
