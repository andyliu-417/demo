import { ITEM_SET, ITEM_REDIRECT,ITEM_MSG } from "../types";

const reducer_handlers = {
  [ITEM_SET]: (state, action) => {
    return { ...state, ...action.data, msg:"" };
  },
  [ITEM_REDIRECT]: (state, action) => {
    return { ...state, redirectTo: action.url };
  },
  [ITEM_MSG]: (state, action) => {
    return { ...state, msg: action.msg };
  }
};

let initState = {
  username: "",
  permissions: [],
  redirectTo: "",
  msg:""
};

export default (state = initState, action = { type: "" }) => {
  return reducer_handlers.hasOwnProperty(action.type) &&
    action.itemType === "USER"
    ? reducer_handlers[action.type](state, action)
    : state;
};
