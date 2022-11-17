import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from './index';
import { createLogger } from "redux-logger";

const middlewares = [promise, thunk, createLogger()];

const composedEnhancers = compose(
    applyMiddleware(...middlewares)
);

const store = createStore(rootReducer, composedEnhancers);

export default store;