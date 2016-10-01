const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./mongoose');
const usersRoutes = require('./app/routes/users');
const travelsRoutes = require('./app/routes/travels');
const myTravelsRoutes = require('./app/routes/my/travels');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({message: "Welcome!"}));

const apiRouter = express.Router();
apiRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
apiRouter.get('/users', usersRoutes.getUsers);
apiRouter.post('/users', usersRoutes.registerUser);
apiRouter.post('/users/authenticate', usersRoutes.authenticateUser);
/*
apiRouter.get('/travels', travelsRoutes.getTravels);
apiRouter.post('/travels', travelsRoutes.createTravel);
*/
const apiMyTravelsRouter = express.Router();
apiMyTravelsRouter.use(authorizeTo('manageOwnTravels'));
apiMyTravelsRouter.get('/', myTravelsRoutes.getMyTravels);
apiMyTravelsRouter.post('/', myTravelsRoutes.createMyTravel);
apiRouter.get('/my/travels', apiMyTravelsRouter);

app.use('/api', apiRouter);

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app; // for testing
