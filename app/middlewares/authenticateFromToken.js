const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {

  const authtoken = req.body.authtoken || req.query.authtoken;

  if (!authtoken) {
    return next();
  }

  jwt.verify(authtoken, config.appSecretKey, (err, decodedUser) => {
    if (err) {
      res.status(403);
      res.json({message: 'Failed to authenticate token.'});
    } else {
      req.authenticatedUser = decodedUser;
    }
    next();
  });

}
