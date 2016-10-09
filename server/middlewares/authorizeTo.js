const Permission = require('../models/permission');
const endWithServerError = require('../utils/endWithServerError');

module.exports = (action) => {
  return (req, res, next) => {

    if (!req.authenticatedUser) {
      res.status(403);
      res.json({message: 'No authenticated user.'});
      if (process.env.NODE_ENV == 'test') {
        next();
      }
      return;
    }

    Permission.isActionPermitted(req.authenticatedUser.role, action, (err, isPermitted) => {
      if (err) {
        return endWithServerError('DB failure on role permissions check.');
      }
      if (!isPermitted) {
        res.status(403);
        // res.json({message: 'Action ' + action + ' is not permitted for role ' + req.authenticatedUser.role + '.'});
        res.json({message: 'Action is not permitted.'});
        if (process.env.NODE_ENV == 'test') {
          next();
        }
      } else {
        next();
      }
    });
  }
}
