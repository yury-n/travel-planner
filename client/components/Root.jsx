import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';

const Root = ({ store }) => (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/(:section)' component={App} />
        <Route path='/(:section)/(:subsection)' component={App} />
      </Router>
    </Provider>
);
Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;
