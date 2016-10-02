const endWithServerError = require('../utils/endWithServerError');
const Travel = require('../models/travel');

exports.getTravels = (req, res) => {
  const query = Travel.find({}).select('_userid destination startDate endDate comment');
  query.exec((err, travels) => {
    if (err) {
      return endWithServerError(res, 'DB failure.');
    }
    res.json(travels);
  });
};

exports.getTravel = (req, res) => {
  const query = Travel.findById(req.params.id).select('_userid destination startDate endDate comment');
  query.exec((err, travel) => {
    if (err) {
      return endWithServerError(res, 'DB failure.');
    }
    if (travel) {
      res.json(travel);
    } else {
      res.status(404);
      res.json({message: 'Travel not found.'});
    }
  });
};

exports.createTravel = (req, res) => {

};
