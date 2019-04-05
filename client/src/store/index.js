import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import reducers from "./reducer";
import rootSaga from "./saga";
import createSagaMiddlewear from "redux-saga";

let sagaMiddlewear = createSagaMiddlewear();

let enchancer = applyMiddleware(sagaMiddlewear);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
  combineReducers({
    ...reducers
  }),
  composeEnhancers(enchancer)
);

sagaMiddlewear.run(rootSaga, store);

export default store;
