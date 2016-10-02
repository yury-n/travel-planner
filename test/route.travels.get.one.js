process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../server');
const Travel = require('../app/models/travel');
const validateTravelObject = require('./utils/validateTravelObject');
chai.use(chaiHttp);

describe('GET /api/travels/:id', () => {

  return;

  beforeEach(done => Travel.remove({}, done));

  it('should GET a travel by given id', (done) => {
    const travel = new Travel({_userid: new mongoose.Types.ObjectId, destination: 'Moscow', startDate: new Date('2014-11-01'), endDate: new Date('2014-11-12')});
    travel.save().then(() => {
      chai.request(server)
          .get('/api/travels/' + travel.id)
          .end((err, res) => {
            res.should.have.status(200);
            validateTravelObject(res.body);
            done();
          });
    });
  });

  it('should return 404 if there is no travel with a given id', (done) => {
    chai.request(server)
        .get('/api/travels/' + new mongoose.Types.ObjectId)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
  });

});
