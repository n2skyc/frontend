import {applyMiddleware, createStore, compose} from 'redux'
import {logger} from 'redux-logger'
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import {responsiveStoreEnhancer} from 'redux-responsive'

import reducers from "./reducers";

const middleware = applyMiddleware(promise(), thunk, logger);
// const middleware = applyMiddleware(promise(), thunk);

export default createStore(reducers, compose(responsiveStoreEnhancer, middleware));

