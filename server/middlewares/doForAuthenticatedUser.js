module.exports = (req, res, next) => {
  if (!req.authenticatedUser) {
    res.status(403);
    res.json({message: 'No authenticated user.'});
    if (process.env.NODE_ENV == 'test') {
      next();
    }
  } else {
    req.forUserid = req.authenticatedUser._id;
    next();
  }
};
