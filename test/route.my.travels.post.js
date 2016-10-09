process.env.NODE_ENV = 'test';
const passwordHash = require('password-hash');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const server = require('../server');
const Travel = require('../server/models/travel');
const validateTravelObject = require('./utils/validateTravelObject');
chai.use(chaiHttp);

describe('POST /api/my/travels', () => {

  beforeEach(done => Travel.remove({}, done));

  const myUserid = new mongoose.Types.ObjectId;

  const authtoken = jwt.sign(
    {_id: myUserid},
    config.appSecretKey,
    {expiresIn: '24 hours'}
  );

  it('should create a new travel for the authenticated user', (done) => {
    chai.request(server)
        .post('/api/my/travels')
        .send({
          authtoken,
          destination: 'Sydney',
          startDate: '2014-11-01',
          endDate: '2014-12-01'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Have a great trip to Sydney!');
          res.body.should.have.property('travel');
          validateTravelObject(res.body.travel);
          res.body.travel.should.have.property('_userid').eql(myUserid.toString());
          done();
        });
  });

});
