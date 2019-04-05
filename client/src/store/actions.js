import {
  PROCESSING,
  ITEM_LOAD,
  ITEM_SET,
  ITEM_TYPE,
  ITEM_ADD,
  ITEM_REMOVE,
  ITEM_REDIRECT,
  ITEM_USERINFO,
  ITEM_MSG,
  LOGOUT
} from "./types";
import { LOGIN } from "../services/api";

export const processing = flag => ({
  type: PROCESSING,
  flag
});

export const Event = {
  load: () => ({ type: ITEM_LOAD, itemType: ITEM_TYPE.Event }),
  set: data => ({ type: ITEM_SET, itemType: ITEM_TYPE.Event, data }),
  add: data => ({ type: ITEM_ADD, itemType: ITEM_TYPE.Event, data }),
  remove: id => ({ type: ITEM_REMOVE, itemType: ITEM_TYPE.Event, id })
};

export const User = {
  login: data => ({ type: LOGIN, data }),
  set: data => ({ type: ITEM_SET, itemType: ITEM_TYPE.User, data }),
  msg: msg => ({ type: ITEM_MSG, itemType: ITEM_TYPE.User, msg }),
  redirect: url => ({ type: ITEM_REDIRECT, itemType: ITEM_TYPE.User, url }),
  getUserInfo: () => ({ type: ITEM_USERINFO, itemType: ITEM_TYPE.User }),
  logout: () => ({ type: LOGOUT, itemType: ITEM_TYPE.User })
  // add: data => ({ type: ITEM_ADD, itemType: ITEM_TYPE.Event, data }),
  // remove: id => ({ type: ITEM_REMOVE, itemType: ITEM_TYPE.Event, id })
};
