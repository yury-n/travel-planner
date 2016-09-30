var mongoose = require('mongoose');
var config = require('config');
var Permission = require('./models/permission');

mongoose.connect(config.db.host);

/*
Permission.isActionPermitted('regular', 'manageOwnTravels', function(err, isPermitted){
  console.log(err);
  console.log(isPermitted);
});
*/

Permission.create([
  {role: 'regular', action: 'manageOwnTravels'},

  {role: 'admin', action: 'manageUsers'},
  {role: 'admin', action: 'manageOwnTravels'},

  {role: 'superadmin', action: 'manageUsers'},
  {role: 'superadmin', action: 'manageAnyTravels'},

], function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Done!');
    process.exit();
  }
});
