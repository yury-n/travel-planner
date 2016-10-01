process.env.NODE_ENV = 'test';

const passwordHash = require('password-hash');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
chai.use(chaiHttp);

const validatePublicUserObject = require('./utils/validatePublicUserObject');
const authenticateFromToken = require('../app/middlewares/authenticateFromToken');
const User = require('../app/models/user');

describe('Users', () => {

  beforeEach((done) => {
      User.remove({}, (err) => {
         done();
      });
  });

  describe('/POST /api/authenticate', () => {

    it('should perform authentication and returns authtoken that can be used for further requests', (done) => {
      User.create([{
        name: 'Pedro',
        password: passwordHash.generate('333'),
        role: 'regular'
      }]);
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
              nextReq.authenticatedUser.should.have.property('name').eql('root');
              nextReq.authenticatedUser.should.have.property('role').eql('regular');
              done();
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
      }]);
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

  describe('/GET /api/users', () => {
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

  describe('/POST /api/users', () => {
    it('should create a new user', (done) => {
      chai.request(server)
          .post('/api/users')
          .send({
            name: 'John',
            password: '123'
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Welcome, John!');
            res.body.user.should.have.property('_id');
            res.body.user.should.have.property('name');
            res.body.user.should.have.property('role');
            User.find(res.body.user, (err, doc) => {
              doc.should.be.a('array');
              doc.length.should.be.eql(1);
              passwordHash.verify('123', doc[0].password);
              done();
            });
          });
    });
    it('should not create a new user without name', (done) => {
      chai.request(server)
          .post('/api/users')
          .send({
            password: '123'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message').eql('Missing name.');
            done();
          });
    });
    it('should not create a new user without password', (done) => {
      chai.request(server)
          .post('/api/users')
          .send({
            name: 'Peter'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message').eql('Missing password.');
            done();
          });
    });
    it('should not create a new user if requested name is taken', (done) => {
      User.create([
        {name: 'Keith', password: '123', 'role': 'regular'}
      ]).then(() => {
        chai.request(server)
            .post('/api/users')
            .send({
              name: 'Keith',
              password: '333'
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message').eql('Requested name is taken.');
              done();
            });
      });
    });
  });

});
