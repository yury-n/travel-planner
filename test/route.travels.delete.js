process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../server');
const Travel = require('../server/models/travel');
chai.use(chaiHttp);

describe('DELETE /api/travels/:id', () => {

  beforeEach(done => Travel.remove({}, done));

  it('should DELETE a travel by given id', (done) => {
    const travel = new Travel({
      _userid: new mongoose.Types.ObjectId,
      destination: 'Moscow',
      startDate: new Date('2014-11-01'),
      endDate: new Date('2014-11-12')
    });
    travel.save().then(() => {
      chai.request(server)
          .delete('/api/travels/' + travel.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Travel successfully deleted!');
            Travel.findById(travel.id, (err, travel) => {
              should.not.exist(travel);
              done();
            });
          });
    });
  });

  it('should return 404 on attempt to delete nonexistent travel', (done) => {
    const travel = new Travel({
      _userid: new mongoose.Types.ObjectId,
      destination: 'Moscow',
      startDate: new Date('2014-11-01'),
      endDate: new Date('2014-11-12')
    });
    travel.save().then(() => {
      chai.request(server)
          .delete('/api/travels/' + new mongoose.Types.ObjectId)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
    });
  });

});
