process.env.NODE_ENV = 'test';
const passwordHash = require('password-hash');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../server/models/user');
const validatePublicUserObject = require('./utils/validatePublicUserObject');
const authenticateFromToken = require('../server/middlewares/authenticateFromToken');
chai.use(chaiHttp);

describe('/POST /api/authenticate', () => {

  beforeEach(done => User.remove({}, done));

  it('should perform authentication and returns authtoken that can be used for further requests', (done) => {
    User.create([{
      name: 'Pedro',
      password: passwordHash.generate('333'),
      role: 'regular'
    }]).then(() => {
      chai.request(server)
          .post('/api/users/authenticate')
          .send({
            name: 'Pedro',
            password: '333'
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('authtoken');
            res.body.should.have.property('user');
            validatePublicUserObject(res.body.user);
            // make sure we can authenticate with the given token
            const nextReq = {
              body: {authtoken: res.body.authtoken},
              query: {}
            };
            const nextRes = {};
            authenticateFromToken(nextReq, nextRes, () => {
              should.exist(nextReq.authenticatedUser);
              nextReq.authenticatedUser.should.be.a('object');
              nextReq.authenticatedUser.should.have.property('name').eql('Pedro');
              nextReq.authenticatedUser.should.have.property('role').eql('regular');
              done();
            });
          });
    });
  });

  it('should return an error if username is not found', (done) => {
    chai.request(server)
        .post('/api/users/authenticate')
        .send({
          name: 'Iamtotallymissing',
          password: '333'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').eql('Authentication failed. User not found.');
          done();
        });
  });
  it('should return an error if password is wrong', (done) => {
    User.create([{
      name: 'Augusto',
      password: passwordHash.generate('333'),
      role: 'regular'
    }]).then(() => {
      chai.request(server)
          .post('/api/users/authenticate')
          .send({
            name: 'Augusto',
            password: '111'
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('message').eql('Authentication failed. Wrong password.');
            done();
          });
    });
  });
  it('should return an error on missing name', (done) => {
    chai.request(server)
        .post('/api/users/authenticate')
        .send({
          password: '123'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Missing name.');
          done();
        });
  });
  it('should return an error on missing password', (done) => {
    chai.request(server)
        .post('/api/users/authenticate')
        .send({
          name: 'Kate'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Missing password.');
          done();
        });
  });
});
