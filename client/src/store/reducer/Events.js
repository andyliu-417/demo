import { ITEM_SET } from "../types";

const reducer_handlers = {
  [ITEM_SET]: (state, action) => {
    return { ...state, data: action.data };
  }
};

let initState = {
  data: [],
  processing: false
};

export default (state = initState, action = { type: "" }) => {
  return reducer_handlers.hasOwnProperty(action.type) &&
    action.itemType === "EVENT"
    ? reducer_handlers[action.type](state, action)
    : state;
};
