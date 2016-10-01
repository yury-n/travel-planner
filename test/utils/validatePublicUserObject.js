module.exports = (user) => {
  user.should.be.a('object');
  user.should.have.property('_id');
  user.should.have.property('name');
  user.should.have.property('role');
  Object.keys(user).length.should.be.eql(3);
}
