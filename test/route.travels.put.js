process.env.NODE_ENV = 'test';
const passwordHash = require('password-hash');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../server');
const Travel = require('../server/models/travel');
chai.use(chaiHttp);

describe('PUT /api/travels/:id', () => {

  beforeEach(done => Travel.remove({}, done));

  it('should UPDATE a travel given the id', (done) => {
    const travel = new Travel({
      _userid: new mongoose.Types.ObjectId,
      destination: 'Boston',
      startDate: new Date('2014-11-01'),
      endDate: new Date('2014-11-12'),
      comment: 'this is something old'
    });
    travel.save().then(() => {
      chai.request(server)
          .put('/api/travels/' + travel.id)
          .send({
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

  it('should return an error if no fields/values to update passed', (done) => {
    chai.request(server)
        .put('/api/travels/111')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
  });

});
