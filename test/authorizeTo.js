process.env.NODE_ENV = 'test';

const authorizeTo = require('../app/middlewares/authorizeTo');
const sinon = require('sinon');

describe('authorizeTo middleware', () => {
  return;
  it('should call next() once', (done) => {
    const mw = authorizeTo('manageOwnTravels');

  });
});
