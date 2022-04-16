import { combineReducers } from "redux";

import cartReducer, { cartProps } from "./cart";

export type ReducerStateProps = {
  [k: string]: cartProps;
};

export default combineReducers({
  cartReducer,
});
