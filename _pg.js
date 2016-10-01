const object = require('lodash/object');

console.log(object.pick({'a': 1111, 'b': 222}, ['a']));

/*
Permission.isActionPermitted('regular', 'manageOwnTravels', function(err, isPermitted){
  console.log(err);
  console.log(isPermitted);
});
*/
