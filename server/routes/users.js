const object = require('lodash/object');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('config');
const validatePresenceOfFields = require('../utils/validatePresenceOfFields');
const endWithServerError = require('../utils/endWithServerError');
const User = require('../models/user');

exports.getUsers = (req, res) => {

  const query = User.find({}).select('name role');
  query.exec((err, users) => {
    if (err) {
      return endWithServerError(res, 'DB failure.');
    }
    res.json(users);
  });
};

exports.getUser = (req, res) => {

  const query = User.findById(req.params.id).select('name role');
  query.exec((err, user) => {
    if (err) {
      return endWithServerError(res, 'DB failure.');
    }
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      res.json({message: 'User not found.'});
    }
  });
};

exports.createUser = (req, res) => {

  if (!validatePresenceOfFields(req, res, ['name', 'password1', 'password2'], 'all')) {
    return;
  }
  const name = req.body.name;
  const password1 = req.body.password1;
  const password2 = req.body.password2;

  if (password1 !== password2) {
    res.status(400);
    res.json({message: 'Passwords don\'t match.'});
    return;
  }

  User.findOne({name: name}, (err, doc) => {
    if (doc !== null) {
      res.status(400);
      res.json({message: 'Requested name is taken.'});
      return;
    }
    const newUser = new User({
      name: name,
      password: passwordHash.generate(password1),
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

exports.deleteUser = (req, res) => {

  User.remove({_id: req.params.id}, (err) => {
    if (err) {
      return endWithServerError(res, 'DB failure.');
    }
    res.json({message: 'User successfully deleted!'});
  });
};

exports.updateUser = (req, res) => {

  if (!validatePresenceOfFields(req, res, ['name', 'role', 'password'], 'any')) {
    return;
  }
  User.findById(req.params.id, 'name, role, password', (err, user) => {
    if (err) {
      return endWithServerError(res, 'DB failure.');
    }
    const updates = {};
    if (req.body.name) {
      updates['name'] = req.body.name;
    }
    if (req.body.role) {
      updates['role'] = req.body.role;
    }
    if (req.body.password) {
      updates['password'] = passwordHash.generate(req.body.password);
    }
    Object.assign(user, updates).save((err, book) => {
      if (err) {
        return endWithServerError(res, 'DB failure.');
      }
			res.json({message: 'User successfully updated!'});
		});
  });
};

exports.authenticateUser = (req, res) => {

  if (!validatePresenceOfFields(req, res, ['name', 'password'], 'all')) {
    return;
  }
  User.findOne({name: req.body.name}, 'name role password', (err, user) => {
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
    const publicUserInfo = object.pick(user, ['_id', 'name', 'role']);
    const authtoken = jwt.sign(
      publicUserInfo,
      config.appSecretKey,
      {expiresIn: '24 hours'}
    );

    res.json({
      message: 'Welcome back, ' + user.name + '!',
      authtoken: authtoken,
      user: publicUserInfo
    });
  });
};
