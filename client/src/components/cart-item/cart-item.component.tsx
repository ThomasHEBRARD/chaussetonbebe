import React from "react";
import {
  CartItemContainer,
  ImageContainer,
  ItemDetailsContainer,
} from "./cart-item.styles";

import cartItemProps from "../../interface/cartItem.interface";

const CartItem: React.FC<{ cartItem: cartItemProps }> = ({ cartItem }) => {
  return (
    <CartItemContainer>
      <ImageContainer src={cartItem.imageUrl} alt="" />
      <ItemDetailsContainer>
        <span className="name">{cartItem.name}</span>
        <span className="price">
          {cartItem.count} x €{cartItem.price}
        </span>
      </ItemDetailsContainer>
    </CartItemContainer>
  );
};

export default CartItem;
