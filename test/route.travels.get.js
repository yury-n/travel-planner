process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../server');
const Travel = require('../server/models/travel');
const validateTravelObject = require('./utils/validateTravelObject');
chai.use(chaiHttp);

describe('GET /api/travels', () => {

  beforeEach(done => Travel.remove({}, done));

  it('should return a list of travels', (done) => {
    Travel.create([
      {_userid: new mongoose.Types.ObjectId, destination: 'Moscow', startDate: new Date('2014-11-01'), endDate: new Date('2014-11-12')},
      {_userid: new mongoose.Types.ObjectId, destination: 'Miami', startDate: new Date('2015-01-01'), endDate: new Date('2015-02-01')}
    ]).then(() => {
      chai.request(server)
          .get('/api/travels')
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
  
  it('should return empty array when there is no travels', (done) => {
    chai.request(server)
        .get('/api/travels')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
  });

});
