const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const usersRoutes = require('./app/routes/users');

const app = express();
const port = 3000;

mongoose.connect(config.db.host);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({message: "Welcome!"}));

const apiRouter = express.Router();
apiRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
apiRouter.get('/users', usersRoutes.getUsers);
apiRouter.post('/users', usersRoutes.registerUser);
//apiRouter.post('/users/authenticate', usersRoutes.authenticateUser);
app.use('/api', apiRouter);

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app; // for testing
