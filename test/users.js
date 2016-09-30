process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
chai.use(chaiHttp);

const User = require('../app/models/user');

describe('Users', () => {

    beforeEach((done) => {
        User.remove({}, (err) => {
           done();
        });
    });

    describe('/GET /api/users', () => {
      it('should return a list of users', (done) => {
        User.create([
          {name: 'yury', password: '123', 'role': 'superadmin'},
          {name: 'matt', password: '123', 'role': 'admin'}
        ]).then(() => {
          chai.request(server)
              .get('/api/users')
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(2);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('role');
                Object.keys(res.body[0]).length.should.be.eql(3);
                done();
              });
        });
      });
      it('should return empty array when there is no users', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);
              done();
            });
      });
    });

    describe('/POST /api/users', () => {
      it('should create a new user', (done) => {
        chai.request(server)
            .post('/api/users')
            .send({
              name: 'John',
              password: '123'
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Welcome, John!');
              res.body.user.should.have.property('_id');
              res.body.user.should.have.property('name');
              res.body.user.should.have.property('role');
              done();
            });
      });
    });

});
