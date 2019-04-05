import { takeEvery, all, call, put, select } from "redux-saga/effects";
import { ITEM_LOAD, ITEM_ADD, ITEM_REMOVE, ITEM_TYPE } from "../types";
import * as actions from "../actions";
import * as selectors from "../selectors";

import { RestApi } from "../../services/http";

function* loadEventsSaga() {
  try {
    let result = yield call(RestApi.loadEvents);
    if (result) {
      yield put(actions.Event.set(result));
    }
  } catch (error) {}
}

function* addEventSaga(action) {
  try {
    let param = action.data;
    let result = yield call(RestApi.addEvent, param);
    if (result) {
      let events = yield select(selectors.selectEvents);
      let newEvents = [...events, result.data];
      yield put(actions.Event.set(newEvents));
    }
  } catch (error) {}
}

function* removeEventSaga(action) {
  try {
    let result = yield call(RestApi.removeEvent, action.id);
    if (result) {
      let events = yield select(selectors.selectEvents);
      let newEvents = events.filter(el => el._id !== action.id);
      (events.length, newEvents.length);
      yield put(actions.Event.set(newEvents));
    }
  } catch (error) {}
}

export function* Saga(action) {
  yield all([
    takeEvery(
      action =>
        action.type === ITEM_LOAD && action.itemType === ITEM_TYPE.Event,
      loadEventsSaga
    ),
    takeEvery(
      action => action.type === ITEM_ADD && action.itemType === ITEM_TYPE.Event,
      addEventSaga
    ),
    takeEvery(
      action =>
        action.type === ITEM_REMOVE && action.itemType === ITEM_TYPE.Event,
      removeEventSaga
    )
  ]);
}
