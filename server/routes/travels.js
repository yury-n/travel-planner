const validatePresenceOfFields = require('../utils/validatePresenceOfFields');
const endWithServerError = require('../utils/endWithServerError');
const Travel = require('../models/travel');

const getISODateWithoutTime = (date) =>
  date.toISOString().substring(0, 10);

exports.getTravels = (req, res) => {
  const filter = {};
  if (req.forUserid) {
    filter._userid = req.forUserid;
  }
  const query = Travel.find(filter).select('_id _userid destination startDate endDate comment');
  query.exec((err, travels) => {
    if (err) {
      return endWithServerError(res, 'DB failure.');
    }
    travels = travels.map(travel => {
      return Object.assign(travel.toObject(), {
        startDate: getISODateWithoutTime(travel.startDate),
        endDate: getISODateWithoutTime(travel.endDate)
      });
    })
    res.json(travels);
  });
};

exports.getTravel = (req, res) => {

  const query = Travel.findById(req.params.id).select('_id _userid destination startDate endDate comment');
  query.exec((err, travel) => {
    if (err) {
      return endWithServerError(res, 'DB failure.');
    }
    travel.startDate = getISODateWithoutTime(travel.startDate);
    travel.endDate = getISODateWithoutTime(travel.endDate);
    if (travel) {
      res.json(travel);
    } else {
      res.status(404);
      res.json({message: 'Travel not found.'});
    }
  });
};

exports.createTravel = (req, res) => {
  if (req.forUserid) {
    req.body._userid = req.forUserid;
  }
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
    newTravel.startDate = getISODateWithoutTime(startDate);
    newTravel.endDate = getISODateWithoutTime(endDate);
    res.json({
      message: `Have a great trip to ${destination}!`,
      travel: Object.assign(newTravel.toObject(), {
        startDate: getISODateWithoutTime(startDate),
        endDate: getISODateWithoutTime(endDate)
      })
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
        return endWithServerError(res, 'DB failure. Failed to fetch.');
      }
      const updates = {};
      if (req.body.destination) {
        updates.destination = req.body.destination;
      }
      if (req.body.startDate) {
        updates.startDate = new Date(req.body.startDate);
      }
      if (req.body.endDate) {
        updates.endDate = new Date(req.body.endDate);
      }
      if (req.body.comment) {
        updates.comment = req.body.comment;
      }
      if (isNaN(updates.startDate.getTime())) {
        res.status(400);
        return res.json({message: 'Invalid startDate.'});
      }
      if (isNaN(updates.endDate.getTime())) {
        res.status(400);
        return res.json({message: 'Invalid endDate.'});
      }
      if (updates.startDate.getTime() > updates.endDate.getTime()) {
        res.status(400);
        return res.json({message: 'endDate should be greater than startDate.'});
      }

      Object.assign(travel, updates).save((err, book) => {
        if (err) {
          return endWithServerError(res, 'DB failure. Failed to save.');
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
