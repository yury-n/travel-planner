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

const apiUsersRouter = express.Router();
//apiUsersRouter.use(authorizeTo('manageUsers'));
apiUsersRouter.get('/', usersRoutes.getUsers);
apiUsersRouter.post('/', usersRoutes.createUser);
apiUsersRouter.get('/:id', usersRoutes.getUser);
apiUsersRouter.put('/:id', usersRoutes.updateUser);
apiUsersRouter.delete('/:id', usersRoutes.deleteUser);

const apiTravelsRouter = express.Router();
//apiTravelsRouter.use(authorizeTo('manageAnyTravels'));
apiTravelsRouter.get('/', travelsRoutes.getTravels);
apiTravelsRouter.post('/', travelsRoutes.createTravel);
apiTravelsRouter.get('/:id', travelsRoutes.getTravel);
apiTravelsRouter.put('/:id', travelsRoutes.updateTravel);
apiTravelsRouter.delete('/:id', travelsRoutes.deleteTravel);

const apiMyTravelsRouter = express.Router();
//apiMyTravelsRouter.use(authorizeTo('manageOwnTravels'));
apiMyTravelsRouter.get('/', myTravelsRoutes.getMyTravels);
apiMyTravelsRouter.post('/', myTravelsRoutes.createMyTravel);

apiRouter.use('/users', apiUsersRouter);
apiRouter.use('/travels', apiTravelsRouter);
apiRouter.use('/my/travels', apiMyTravelsRouter);

app.use('/api', apiRouter);

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app; // for testing
