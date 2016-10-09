process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../server');
const User = require('../server/models/user');
const Travel = require('../server/models/travel');
chai.use(chaiHttp);

describe('DELETE /api/users/:id', () => {

  beforeEach(done => {
    User.remove({}, () => {
      Travel.remove({}, done);
    });
  });

  it('should DELETE a user by given id and delete his travels', (done) => {
    const newUser = new User({name: 'Nick', password: '111', role: 'admin'});
    newUser.save().then(() => {
      Travel.create([
        {_userid: newUser.id, destination: 'Moscow', startDate: new Date('2014-11-01'), endDate: new Date('2014-11-12')},
        {_userid: newUser.id, destination: 'Miami', startDate: new Date('2015-01-01'), endDate: new Date('2015-02-01')}
      ]).then(() => {
        chai.request(server)
            .delete('/api/users/' + newUser.id)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('User successfully deleted!');
              User.findById(newUser.id, (err, fetchedUser) => {
                should.not.exist(fetchedUser);
                const travelsQuery = Travel.find({'_userid': newUser.id}).select('_id');
                travelsQuery.exec((err, travels) => {
                  travels.length.should.be.eql(0);
                  done();
                });
              });
            });
      });
    });
  });

  it('should return 404 on attempt to delete nonexistent user', (done) => {
    chai.request(server)
        .delete('/api/users/' + new mongoose.Types.ObjectId)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
  });

});
