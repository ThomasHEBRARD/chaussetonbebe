import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './stylesheets/icon-font.css';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import Store from './services/redux/store';

import CartProvider from './providers/cart/cart.provider';

ReactDOM.render(
  <Provider store={Store}>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
  </Provider>,
  document.getElementById('root')
);
