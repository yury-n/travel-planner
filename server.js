var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 3000;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// INDEX
app.get('/', (req, res) => res.json({message: "Welcome!"}));

// API
var router = express.Router();
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app; // for testing
