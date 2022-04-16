import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combinedReducers from "./combinedReducers";

const ConfigureStore = () => {
  var intialState = {};
  try {
    intialState = localStorage.getItem("redux")
      ? JSON.parse(localStorage.getItem("redux"))
      : {};
  } catch (error) {
    console.log("getError", error);
  }
  const saver = (store) => (next) => (action) => {
    let stateToSave = store.getState();
    localStorage.setItem("redux", JSON.stringify({ ...stateToSave }));
    return next(action);
  };
  return createStore(
    combinedReducers,
    intialState,
    applyMiddleware(thunk, saver)
  );
};

const Store = ConfigureStore();

export default Store;
