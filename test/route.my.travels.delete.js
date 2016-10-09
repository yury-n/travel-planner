process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const server = require('../server');
const Travel = require('../server/models/travel');
chai.use(chaiHttp);

describe('DELETE /api/my/travels/:id', () => {

  beforeEach(done => Travel.remove({}, done));

  const myUserid = new mongoose.Types.ObjectId;
  const notMyUserid = new mongoose.Types.ObjectId;

  const authtoken = jwt.sign(
    {_id: myUserid},
    config.appSecretKey,
    {expiresIn: '24 hours'}
  );

  it('should DELETE a travel by given id when it belongs to the authed user', (done) => {
    const travel = new Travel({
      _userid: myUserid,
      destination: 'Moscow',
      startDate: new Date('2014-11-01'),
      endDate: new Date('2014-11-12')
    });
    travel.save().then(() => {
      chai.request(server)
          .delete('/api/my/travels/' + travel.id + '/?authtoken=' + authtoken)
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

  it('should return 403 on attempt to delete a travel of a different user', (done) => {
    const travel = new Travel({
      _userid: notMyUserid,
      destination: 'Moscow',
      startDate: new Date('2014-11-01'),
      endDate: new Date('2014-11-12')
    });
    travel.save().then(() => {
      chai.request(server)
          .delete('/api/my/travels/' + travel.id + '/?authtoken=' + authtoken)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('message').eql('Not allowed to delete this travel.');
            done();
          });
    });
  });

});
