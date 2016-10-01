module.exports = (req, res, fields) => {
  const missing = [];
  fields.forEach((field) => {
    if (!req.body[field]) {
      missing.push(field);
    }
  });
  if (missing.length) {
    res.status(400);
    res.json({message: 'Missing ' + missing.join(', ') + '.'});
    return false;
  } else {
    return true;
  }
}
