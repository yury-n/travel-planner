process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../server/models/user');
chai.use(chaiHttp);

describe('DELETE /api/users/:id', () => {

  beforeEach(done => User.remove({}, done));

  it('should DELETE a user by given id', (done) => {
    const user = new User({name: 'Nick', password: '111', role: 'admin'});
    user.save().then(() => {
      chai.request(server)
          .delete('/api/users/' + user.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('User successfully deleted!');
            User.findById(user.id, (err, user) => {
              should.not.exist(user);
              done();
            });
          });
    });
  });

});
