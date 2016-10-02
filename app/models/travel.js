var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Travel', new Schema({
    _userid: { type: Schema.Types.ObjectId, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    comment: { type: String, required: false }
}));
