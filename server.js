const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.babel');
const mongoose = require('./mongoose');
const usersRoutes = require('./server/routes/users');
const travelsRoutes = require('./server/routes/travels');
const authenticateFromToken = require('./server/middlewares/authenticateFromToken');
const authorizeTo = require('./server/middlewares/authorizeTo');
const doForAuthenticatedUser = require('./server/middlewares/doForAuthenticatedUser');
const url = require('url');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/static'));
app.use(favicon(__dirname + '/favicon.ico'));

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

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
apiUsersRouter.get('/', usersRoutes.getUsers);
apiUsersRouter.get('/:id', usersRoutes.getUser);
if (process.env.NODE_ENV != 'test') {
  apiUsersRouter.post('/', authorizeTo('manageUsers'));
  apiUsersRouter.put('/:id', authorizeTo('manageUsers'));
  apiUsersRouter.delete('/:id', authorizeTo('manageUsers'));
}
apiUsersRouter.post('/', usersRoutes.createUser);
apiUsersRouter.put('/:id', usersRoutes.updateUser);
apiUsersRouter.delete('/:id', usersRoutes.deleteUser);

const apiTravelsRouter = express.Router();
if (process.env.NODE_ENV != 'test') {
  apiTravelsRouter.use(authorizeTo('manageAnyTravels'));
}
apiTravelsRouter.get('/', travelsRoutes.getTravels);
apiTravelsRouter.post('/', travelsRoutes.createTravel);
apiTravelsRouter.get('/:id', travelsRoutes.getTravel);
apiTravelsRouter.put('/:id', travelsRoutes.updateTravel);
apiTravelsRouter.delete('/:id', travelsRoutes.deleteTravel);

const apiMyTravelsRouter = express.Router();
if (process.env.NODE_ENV != 'test') {
  apiMyTravelsRouter.use(authorizeTo('manageOwnTravels'));
}
apiMyTravelsRouter.use(doForAuthenticatedUser);
apiMyTravelsRouter.get('/', travelsRoutes.getTravels);
apiMyTravelsRouter.post('/', travelsRoutes.createTravel);
apiMyTravelsRouter.put('/:id', travelsRoutes.updateTravel);
apiMyTravelsRouter.delete('/:id', travelsRoutes.deleteTravel);

apiRouter.use('/users', apiUsersRouter);
apiRouter.use('/travels', apiTravelsRouter);
apiRouter.use('/my/travels', apiMyTravelsRouter);

app.use('/api', apiRouter);

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app; // for testing
