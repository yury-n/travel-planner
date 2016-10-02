process.env.NODE_ENV = 'test';
const passwordHash = require('password-hash');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../app/models/user');
chai.use(chaiHttp);

describe('POST /api/users', () => {

  return;

  beforeEach(done => User.remove({}, done));

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
