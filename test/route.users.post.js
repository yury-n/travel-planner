process.env.NODE_ENV = 'test';
const passwordHash = require('password-hash');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../server/models/user');
const validatePublicUserObject = require('./utils/validatePublicUserObject');
chai.use(chaiHttp);

describe('POST /api/users', () => {

  beforeEach(done => User.remove({}, done));

  const allRequiredFields = {
    name: 'Peter',
    password: '123'
  };

  it('should create a new user', (done) => {
    chai.request(server)
        .post('/api/users')
        .send(allRequiredFields)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Welcome, Peter!');
          res.body.should.have.property('user');
          validatePublicUserObject(res.body.user);
          User.find(res.body.user, (err, doc) => {
            doc.should.be.a('array');
            doc.length.should.be.eql(1);
            passwordHash.verify('123', doc[0].password);
            done();
          });
        });
  });

  Object.keys(allRequiredFields).forEach(requiredField => {
    it(`should not create a new user without ${requiredField}`, (done) => {
      const sendFields = Object.assign({}, allRequiredFields);
      delete sendFields[requiredField];
      chai.request(server)
          .post('/api/users')
          .send(sendFields)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message').eql(`Missing ${requiredField}.`);
            done();
          });
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
