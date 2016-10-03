process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../server/models/user');
const validatePublicUserObject = require('./utils/validatePublicUserObject');
chai.use(chaiHttp);

describe('GET /api/users', () => {

  beforeEach(done => User.remove({}, done));

  it('should return a list of users', (done) => {
    User.create([
      {name: 'yury', password: '123', 'role': 'superadmin'},
      {name: 'matt', password: '123', 'role': 'admin'}
    ]).then(() => {
      chai.request(server)
          .get('/api/users')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2);
            validatePublicUserObject(res.body[0]);
            validatePublicUserObject(res.body[1]);
            done();
          });
    });
  });
  it('should return empty array when there is no users', (done) => {
    chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
  });
});
