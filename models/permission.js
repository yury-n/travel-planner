var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var permissionSchema = new Schema({
  role: {
    type: String,
    enum: ['regular', 'admin', 'superadmin']
  },
  action: {
    type: String,
    enum: ['manageOwnTravels', 'manageUsers', 'manageAnyTravels']
  }
});

permissionSchema.statics.isActionPermitted = function(role, action, callback) {
  this.findOne({role: role, action: action}, function(err, doc){
    if(err) {
      return callback(err, false);
    }
    callback(null, doc !== null);
  });
};

module.exports = mongoose.model('Permission', permissionSchema);
