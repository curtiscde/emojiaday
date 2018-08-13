import { applyMiddleware, createStore } from 'redux';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducers';

import Config from './config';

const middleware = Config.debug ? applyMiddleware(promise(), thunk, createLogger())
  : applyMiddleware(promise(), thunk);

export default createStore(reducer, middleware);
