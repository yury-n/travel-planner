process.env.NODE_ENV = 'test';
const sinon = require('sinon');
const authorizeTo = require('../server/middlewares/authorizeTo');

describe('authorizeTo middleware', () => {

  const permissions = [
    // role, action
    ['regular', 'manageOwnTravels'],
    ['admin', 'manageUsers'],
    ['admin', 'manageOwnTravels'],
    ['superadmin', 'manageUsers'],
    ['superadmin', 'manageAnyTravels']
  ];

  permissions.forEach(pair => {
    const role = pair[0];
    const action = pair[1];
    it(`should authorize a user with role "${role}" for action "${action}"`, (done) => {
      const req = {
        authenticatedUser: {role: role}
      };
      const res = {};
      authorizeTo(action)(req, res, done);
    });
  });

  it('should return 403 if there is no authenticated user', (done) => {
    const action = 'manageUsers';
    const req = {};
    const res = {
      status: sinon.spy(),
      json: sinon.spy()
    };
    authorizeTo(action)(req, res, () => {
      res.status.called.should.be.true;
      res.status.calledWith(403).should.be.true;
      done();
    });
  });

  it('should return 403 error if action is not permitted to the user\'s role', (done) => {
    const role = 'regular';
    const action = 'manageUsers';
    const req = {
      authenticatedUser: {role: role}
    };
    const res = {
      status: sinon.spy(),
      json: sinon.spy()
    };
    authorizeTo(action)(req, res, () => {
      res.status.called.should.be.true;
      res.status.calledWith(403).should.be.true;
      done();
    });
  });
});
