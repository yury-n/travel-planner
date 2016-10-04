import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';

const configureStore = () => {
    return createStore(
        rootReducer,
        compose(
            //applyMiddleware(thunkMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        ));
};

export default configureStore;