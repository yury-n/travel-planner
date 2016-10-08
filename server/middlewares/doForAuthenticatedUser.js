module.exports = (req, res, next) => {
  if (!req.authenticatedUser) {
    res.status(403);
    res.json({message: 'No authenticated user.'});
  } else {
    req.forUserid = req.authenticatedUser._id;
  }
  return next();
};
