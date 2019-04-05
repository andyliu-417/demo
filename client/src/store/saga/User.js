import { takeEvery, all, call, put } from "redux-saga/effects";
import { LOGIN, REGISTER, ITEM_USERINFO, LOGOUT } from "../types";
import * as actions from "../actions";
import { RestApi } from "../../services/http";

function* loginSaga(action) {
  try {
    let result = yield call(RestApi.login, action.data);
    if (result.code === 0) {
      localStorage.setItem("userid", result.data._id);
      yield put(actions.User.set(result.data));
      yield put(actions.User.redirect("/events"));
    } else {
      yield put(actions.User.msg(result.msg));
    }
  } catch (error) {}
}

function* logoutSaga() {
  try {
    localStorage.setItem("userid", "");
    yield put(actions.User.set({ username: "", _id: "" }));
    yield put(actions.User.redirect("/login"));
  } catch (error) {}
}

function* registerSaga(action) {
  try {
    let result = yield call(RestApi.register, action.data);
    if (result.code === 0) {
      localStorage.setItem("userid", result.data._id);
      yield put(actions.User.set(result.data));
      yield put(actions.User.redirect("/events"));
    } else {
      yield put(actions.User.msg(result.msg));
    }
  } catch (error) {}
}

function* getUserInfoSaga() {
  try {
    let result = yield call(RestApi.getUserInfo);
    if (result) {
      yield put(actions.User.set(result.data));
    }
  } catch (error) {}
}

export function* Saga(action) {
  yield all([
    takeEvery(action => action.type === LOGIN, loginSaga),
    takeEvery(action => action.type === LOGOUT, logoutSaga),
    takeEvery(action => action.type === REGISTER, registerSaga),
    takeEvery(action => action.type === ITEM_USERINFO, getUserInfoSaga)
  ]);
}
