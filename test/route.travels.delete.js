process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../server');
const Travel = require('../app/models/travel');
chai.use(chaiHttp);

describe('DELETE /api/travels/:id', () => {

  return;

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

});
