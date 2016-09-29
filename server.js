"use strict";

let express = require('express');
let bodyParser = require('body-parser');

let app = express();
let port = 8080;

app.get('/', (req, res) => res.json({message: "Welcome!"}));

var router = express.Router();
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app; // for testing
