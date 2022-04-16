import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './stylesheets/icon-font.css';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import Store from './services/redux/store';

import CartProvider from './providers/cart/cart.provider';
import CollectionProvider from './providers/collection/collection.provider';

ReactDOM.render(
  <Provider store={Store}>
    <CollectionProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </CollectionProvider>
  </Provider>,
  document.getElementById('root')
);
