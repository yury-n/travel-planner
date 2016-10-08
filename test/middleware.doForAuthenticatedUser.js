process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');
const doForAuthenticatedUser = require('../server/middlewares/doForAuthenticatedUser');

describe('doForAuthenticatedUser middleware', () => {

  it('should set forUserid attr and call next()', (done) => {
    const req = {
      authenticatedUser: {
        _id: 123
      }
    };
    const res = {};
    doForAuthenticatedUser(req, res, () => {
      should.exist(req.forUserid);
      req.forUserid.should.be.eql(123);
      done();
    });
  });

  it('should return 403 if there is no authenticated user', (done) => {
    const req = {};
    const res = {
      status: sinon.spy(),
      json: sinon.spy()
    };
    doForAuthenticatedUser(req, res, () => {
      res.status.called.should.be.true;
      res.status.calledWith(403).should.be.true;
      done();
    });
  });

});
