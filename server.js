const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./mongoose');
const usersRoutes = require('./app/routes/users');
const travelsRoutes = require('./app/routes/travels');
const myTravelsRoutes = require('./app/routes/my/travels');
const authorizeTo = require('./app/middlewares/authorizeTo');
const authenticateFromToken = require('./app/middlewares/authenticateFromToken');
const url = require('url');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({message: "Welcome!"}));

const apiRouter = express.Router();
apiRouter.all('*', (req, res, next) => {
  if (url.parse(req.url).pathname == '/users/authenticate') {
    usersRoutes.authenticateUser(req, res, next);
  } else {
    authenticateFromToken(req, res, next);
  }
});
apiRouter.get('/users', usersRoutes.getUsers);
apiRouter.post('/users', usersRoutes.registerUser);
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
