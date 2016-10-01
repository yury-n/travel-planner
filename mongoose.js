const config = require('config');
const mongoose = require('mongoose');

mongoose.connect(config.db.host);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
