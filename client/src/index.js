import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./stylesheets/icon-font.css";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./services/redux/store";
import { debounce } from "debounce";
import CartProvider from "./providers/cart/cart.provider";

Store.subscribe(
  debounce(() => {
    let stateToSave = Store.getState();
    localStorage.setItem("redux", JSON.stringify({ ...stateToSave }));
  }, 0)
);

ReactDOM.render(
  <Provider store={Store}>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </Provider>,
  document.getElementById("root")
);
