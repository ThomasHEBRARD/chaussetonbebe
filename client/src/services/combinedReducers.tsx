import { combineReducers } from "redux";

import basketReducer, { basketProps } from "./basket";

export type ReducerStateProps = {
  [k: string]: basketProps;
};

export default combineReducers({
  basketReducer,
});
