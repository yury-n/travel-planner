process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../app/models/user');
const validatePublicUserObject = require('./utils/validatePublicUserObject');
chai.use(chaiHttp);

describe('GET /api/users/:id', () => {

  return;

  beforeEach(done => User.remove({}, done));

  it('should GET a user by given id', (done) => {
    const user = new User({name: 'Nick', password: '111', role: 'admin'});
    user.save().then(() => {
      chai.request(server)
          .get('/api/users/' + user.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('_id').eql(user.id);
            res.body.should.have.property('name');
            res.body.should.have.property('role');
            done();
          });
    });
  });

});
