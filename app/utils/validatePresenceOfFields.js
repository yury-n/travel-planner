module.exports = (req, res, fields, requireMode) => {
  const missing = [];
  fields.forEach((field) => {
    if (!req.body[field]) {
      missing.push(field);
    }
  });
  if (requireMode == 'all' && missing.length) {
    res.status(400);
    res.json({message: 'Missing ' + missing.join(', ') + '.'});
    return false;
  } else if (requireMode == 'any' && missing.length == fields.length) {
    res.status(400);
    res.json({message: 'Provide value for at least one of (' + fields.join(', ') + ').'});
    return false;
  } else {
    return true;
  }
}
