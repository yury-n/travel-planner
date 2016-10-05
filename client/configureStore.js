import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const configureStore = () => {

    return createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        ));
};

export default configureStore;
