process.env.NODE_ENV = 'test';
const jwt = require('jsonwebtoken');
const config = require('config');
const sinon = require('sinon');
const chai = require('chai');
const should = chai.should();
const authenticateFromToken = require('../server/middlewares/authenticateFromToken');

describe('authenticateFromToken middleware', () => {

  it('should authenticate from body field', (done) => {
    const authtoken = jwt.sign(
      {name: 'Micah', role: 'admin'},
      config.appSecretKey
    );
    const req = {
      body: {authtoken: authtoken},
      query: {}
    };
    const res = {};
    authenticateFromToken(req, res, () => {
      should.exist(req.authenticatedUser);
      req.authenticatedUser.should.be.a('object');
      req.authenticatedUser.should.have.property('name').eql('Micah');
      req.authenticatedUser.should.have.property('role').eql('admin');
      done();
    })
  });

  it('should authenticate from query field', (done) => {
    const authtoken = jwt.sign(
      {name: 'Jane', role: 'admin'},
      config.appSecretKey
    );
    const req = {
      body: {},
      query: {authtoken: authtoken}
    };
    const res = {};
    authenticateFromToken(req, res, () => {
      should.exist(req.authenticatedUser);
      req.authenticatedUser.should.be.a('object');
      req.authenticatedUser.should.have.property('name').eql('Jane');
      req.authenticatedUser.should.have.property('role').eql('admin');
      done();
    })
  });

  it('should neither set authenticated user nor error out on missing authtoken', (done) => {
    const req = {
      body: {},
      query: {}
    };
    const res = {
      status: sinon.spy(),
      json: sinon.spy()
    };
    authenticateFromToken(req, res, () => {
      res.status.called.should.be.false;
      should.not.exist(res.authenticatedUser);
      done();
    });
  });

  it('should error out on invalid authtoken', (done) => {
    const req = {
      body: {authtoken: 'thisiswrong'},
      query: {}
    };
    const res = {
      status: sinon.spy(),
      json: sinon.spy()
    };
    authenticateFromToken(req, res, () => {
      res.status.called.should.be.true;
      should.not.exist(res.authenticatedUser);
      done();
    });
  });

});
