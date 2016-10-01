module.exports = (res, msg) => {
  res.status(500);
  res.json({message: msg});
}
