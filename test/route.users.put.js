process.env.NODE_ENV = 'test';
const passwordHash = require('password-hash');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../app/models/user');
chai.use(chaiHttp);

describe('PUT /api/users/:id', () => {

  beforeEach(done => User.remove({}, done));

  it('should UPDATE a user given the id', (done) => {
    const user = new User({name: 'Nick', password: '111', role: 'admin'});
    user.save().then(() => {
      chai.request(server)
          .put('/api/users/' + user.id)
          .send({name: 'Unick', password: '222', role: 'regular'})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('User successfully updated!');
            User.findOne(
              {_id: user.id},
              'name role password',
              (err, fetchedUser) => {
                should.exist(fetchedUser);
                fetchedUser.should.have.property('name').eql('Unick');
                fetchedUser.should.have.property('role').eql('regular');
                passwordHash.verify('222', fetchedUser.password).should.be.true;
                done();
              }
            );
          });
    });
  });

  it('should return an error if no fields/values to update passed', (done) => {
    chai.request(server)
        .put('/api/users/111')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
  });

});
