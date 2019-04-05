import { fork, all } from "redux-saga/effects";
import { Saga as eventSaga } from "./Event";
import { Saga as userSaga} from "./User";

function* rootSaga(config) {
  yield all([fork(eventSaga), fork(userSaga)]);
}

export default rootSaga;
