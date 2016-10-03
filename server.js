const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const mongoose = require('./mongoose');
const usersRoutes = require('./server/routes/users');
const travelsRoutes = require('./server/routes/travels');
const myTravelsRoutes = require('./server/routes/my/travels');
const authorizeTo = require('./server/middlewares/authorizeTo');
const authenticateFromToken = require('./server/middlewares/authenticateFromToken');
const url = require('url');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/static'));
app.use(favicon(__dirname + '/favicon.ico'));

app.get('*', (req, res, next) => {
  if (url.parse(req.url).pathname.indexOf('/api') === 0) {
    next();
  } else {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

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
