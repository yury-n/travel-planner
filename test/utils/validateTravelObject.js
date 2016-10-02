module.exports = (travel) => {
  travel.should.be.a('object');
  travel.should.have.property('_id');
  travel.should.have.property('_userid');
  travel.should.have.property('destination');
  travel.should.have.property('startDate');
  travel.should.have.property('endDate');
}
