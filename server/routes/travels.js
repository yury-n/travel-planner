const validatePresenceOfFields = require('../utils/validatePresenceOfFields');
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

  if (!validatePresenceOfFields(req, res, ['_userid', 'destination', 'startDate', 'endDate'], 'all')) {
    return;
  }
  const _userid = req.body._userid;
  const destination = req.body.destination;
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);
  const comment = req.body.comment;

  if (isNaN(startDate.getTime())) {
    res.status(400);
    return res.json({message: 'Invalid startDate.'});
  }
  if (isNaN(endDate.getTime())) {
    res.status(400);
    return res.json({message: 'Invalid endDate.'});
  }
  if (startDate.getTime() > endDate.getTime()) {
    res.status(400);
    return res.json({message: 'endDate should be greater than startDate.'});
  }

  const newTravel = new Travel({
    _userid: _userid,
    destination: destination,
    startDate: startDate,
    endDate: endDate,
    comment: comment
  });
  newTravel.save((err, travel) => {
    if (err) {
      return endWithServerError(res, 'DB failure.');
    }
    res.json({
      message: `Have a great trip to ${destination}!`,
      travel: travel
    });
  });
};

exports.updateTravel = (req, res) => {

  if (!validatePresenceOfFields(
    req, res, ['destination', 'startDate', 'endDate', 'comment'], 'any')
  ) {
    return;
  }
  Travel.findById(
    req.params.id,
    '_userid destination startDate endDate comment', (err, travel) => {
      if (err) {
        return endWithServerError(res, 'DB failure.');
      }
      const updates = {};
      if (req.body.destination) {
        updates['destination'] = req.body.destination;
      }
      if (req.body.startDate) {
        updates['startDate'] = new Date(req.body.startDate);
      }
      if (req.body.endDate) {
        updates['endDate'] = new Date(req.body.endDate);
      }
      if (req.body.comment) {
        updates['comment'] = req.body.comment;
      }
      const travelWithUpdates = Object.assign(travel, updates);
      if (isNaN(travelWithUpdates.startDate.getTime())) {
        res.status(400);
        return res.json({message: 'Invalid startDate.'});
      }
      if (isNaN(travelWithUpdates.endDate.getTime())) {
        res.status(400);
        return res.json({message: 'Invalid endDate.'});
      }
      if (travelWithUpdates.startDate.getTime() > travelWithUpdates.endDate.getTime()) {
        res.status(400);
        return res.json({message: 'endDate should be greater than startDate.'});
      }

      travelWithUpdates.save((err, book) => {
        if (err) {
          return endWithServerError(res, 'DB failure.');
        }
  			res.json({message: 'Travel successfully updated!'});
  		});
  });
};

exports.deleteTravel = (req, res) => {

  Travel.remove({_id: req.params.id}, (err) => {
    if (err) {
      return endWithServerError(res, 'DB failure.');
    }
    res.json({message: 'Travel successfully deleted!'});
  });
};
