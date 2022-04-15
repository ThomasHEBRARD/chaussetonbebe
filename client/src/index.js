import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './stylesheets/icon-font.css';
import './index.scss';
import App from './App';

import CartProvider from './providers/cart/cart.provider';
import CollectionProvider from './providers/collection/collection.provider';

ReactDOM.render(
  <CollectionProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </CollectionProvider>,
  document.getElementById('root')
);
