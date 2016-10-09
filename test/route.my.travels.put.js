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
chai.use(chaiHttp);

describe('PUT /api/my/travels/:id', () => {

  beforeEach(done => Travel.remove({}, done));

  const myUserid = new mongoose.Types.ObjectId;
  const notMyUserid = new mongoose.Types.ObjectId;

  const authtoken = jwt.sign(
    {_id: myUserid},
    config.appSecretKey,
    {expiresIn: '24 hours'}
  );

  it('should UPDATE a travel given the id when it belongs to the auth\'ed user', (done) => {
    const travel = new Travel({
      _userid: myUserid,
      destination: 'Boston',
      startDate: new Date('2014-11-01'),
      endDate: new Date('2014-11-12'),
      comment: 'this is something old'
    });
    travel.save().then(() => {
      chai.request(server)
          .put('/api/my/travels/' + travel.id)
          .send({
            authtoken,
            destination: 'Los Angeles',
            startDate: new Date('2015-11-01'),
            endDate: new Date('2016-11-12'),
            comment: 'this is something new'
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Travel successfully updated!');
            Travel.findOne(
              {_id: travel.id},
              'destination startDate endDate comment',
              (err, fetchedTravel) => {
                should.exist(fetchedTravel);
                fetchedTravel.should.have.property('destination').eql('Los Angeles');
                fetchedTravel.should.have.property('comment').eql('this is something new');
                fetchedTravel.should.have.property('startDate');
                fetchedTravel.startDate.getTime().should.be.eql((new Date('2015-11-01')).getTime());
                fetchedTravel.should.have.property('endDate');
                fetchedTravel.endDate.getTime().should.be.eql((new Date('2016-11-12')).getTime());
                done();
              }
            );
          });
    });
  });

  it('should return 403 on attempt to edit a travel of a different user', (done) => {
    const travel = new Travel({
      _userid: notMyUserid,
      destination: 'Boston',
      startDate: new Date('2014-11-01'),
      endDate: new Date('2014-11-12'),
      comment: 'this is something old'
    });
    travel.save().then(() => {
      chai.request(server)
          .put('/api/my/travels/' + travel.id)
          .send({
            authtoken,
            destination: 'Los Angeles',
            startDate: new Date('2015-11-01'),
            endDate: new Date('2016-11-12'),
            comment: 'this is something new'
          })
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('message').eql('Not allowed to update this travel.');
            done();
          });
    });
  });

});
