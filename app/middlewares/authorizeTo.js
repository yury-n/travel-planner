const Permission = require('../models/permission');
const endWithServerError = require('../utils/endWithServerError');

module.exports = (action) => {
  return (req, res, next) => {

    return next();

    if (!req.authenticatedUser) {
      res.status(403);
      res.json({message: 'No authenticated user.'});
      return next();
    }

    Permission.isActionPermitted(req.authenticatedUser.role, action, (err, isPermitted) => {
      if (err) {
        return endWithServerError('DB failure on role permissions check.');
      }
      if (!isPermitted) {
        res.status(403);
        return res.json({message: 'Action is not permitted.'});
      }
      next();
    });
  }
}
