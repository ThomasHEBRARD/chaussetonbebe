import React, { useContext } from "react";

import {
  CartContainer,
  ShoppingIcon,
  ItemCountContainer,
} from "./cart-icon.styles";
import Store from "../../services/redux/store";
import { CartContext } from "../../providers/cart/cart.provider";

const CartIcon: React.FC = () => {
  const { toggleHidden } = useContext(CartContext);

  const totalCount = Store.getState().basketReducer.totalCount;

  return (
    <CartContainer onClick={toggleHidden}>
      <ShoppingIcon />
      <ItemCountContainer>{totalCount}</ItemCountContainer>
    </CartContainer>
  );
};

export default CartIcon;
