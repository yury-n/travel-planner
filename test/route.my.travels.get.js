process.env.NODE_ENV = 'test';
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

describe('GET /api/my/travels', () => {

  beforeEach(done => Travel.remove({}, done));

  const myUserid = new mongoose.Types.ObjectId;
  const notMyUserid = new mongoose.Types.ObjectId;

  const authtoken = jwt.sign(
    {_id: myUserid},
    config.appSecretKey,
    {expiresIn: '24 hours'}
  );

  it('should return a list of user\'s travels', (done) => {

    Travel.create([
      {_userid: myUserid, destination: 'Moscow', startDate: new Date('2014-11-01'), endDate: new Date('2014-11-12')},
      {_userid: myUserid, destination: 'New York', startDate: new Date('2011-11-01'), endDate: new Date('2012-11-12')},
      {_userid: notMyUserid, destination: 'Miami', startDate: new Date('2015-01-01'), endDate: new Date('2015-02-01')}
    ]).then(() => {
      chai.request(server)
          .get('/api/my/travels?authtoken=' + authtoken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2);
            validateTravelObject(res.body[0]);
            validateTravelObject(res.body[1]);
            done();
          });
    });
  });

  it('should return an empty array if there is no travels for the given user', (done) => {
    Travel.create([
      {_userid: notMyUserid, destination: 'New York', startDate: new Date('2011-11-01'), endDate: new Date('2012-11-12')},
      {_userid: notMyUserid, destination: 'Miami', startDate: new Date('2015-01-01'), endDate: new Date('2015-02-01')}
    ]).then(() => {
      chai.request(server)
          .get('/api/my/travels?authtoken=' + authtoken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
    });
  });

});
