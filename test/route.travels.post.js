process.env.NODE_ENV = 'test';
const passwordHash = require('password-hash');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../server');
const Travel = require('../app/models/travel');
const validateTravelObject = require('./utils/validateTravelObject');
chai.use(chaiHttp);

describe('POST /api/travels', () => {

  return;

  beforeEach(done => Travel.remove({}, done));

  const allRequiredFields = {
    _userid: new mongoose.Types.ObjectId,
    destination: 'Sydney',
    startDate: '2014-11-01',
    endDate: '2014-12-01'
  };

  it('should create a new travel', (done) => {
    chai.request(server)
        .post('/api/travels')
        .send(allRequiredFields)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Have a great trip to Sydney!');
          res.body.should.have.property('travel');
          validateTravelObject(res.body.travel);
          Travel.find({}, (err, doc) => {
            doc.should.be.a('array');
            doc.length.should.be.eql(1);
            done();
          });
        });
  });

  Object.keys(allRequiredFields).forEach(requiredField => {
    it(`should not create a new travel without ${requiredField}`, (done) => {
      const sendFields = Object.assign({}, allRequiredFields);
      delete sendFields[requiredField];
      chai.request(server)
          .post('/api/travels')
          .send(sendFields)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message').eql(`Missing ${requiredField}.`);
            done();
          });
    });
  });

  it('should return an error if startDate is invalid', done => {
    const sendFields = Object.assign({}, allRequiredFields, {startDate: 'invalid'});
    chai.request(server)
        .post('/api/travels')
        .send(sendFields)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Invalid startDate.');
          done();
        });
  });

  it('should return an error if endDate is invalid', done => {
    const sendFields = Object.assign({}, allRequiredFields, {endDate: 'invalid'});
    chai.request(server)
        .post('/api/travels')
        .send(sendFields)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Invalid endDate.');
          done();
        });
  });

  it('should not create a new travel if startDate > endDate', done => {
    const sendFields = Object.assign({}, allRequiredFields, {startDate: '2014-11-01', endDate: '2014-10-01'});
    chai.request(server)
        .post('/api/travels')
        .send(sendFields)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('endDate should be greater than startDate.');
          done();
        });
  });

});
