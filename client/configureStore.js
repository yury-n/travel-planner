import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';

const configureStore = () => {

    const store = createStore(
      rootReducer,
      loadState(),
      compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    );

    store.subscribe(throttle(() => {
      saveState({
        authentication: store.getState().authentication
      });
    }, 1000));

    return store;
};

export default configureStore;
