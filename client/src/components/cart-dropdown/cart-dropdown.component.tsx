import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
  CartDropdownContainer,
  CartItemsContainer,
  EmptyMessageContainer,
} from "./cart-dropdown.styles";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import Store from "../../services/redux/store";

import cartItemProps from "../../interface/cartItem.interface";

interface ICartDropdownProps extends RouteComponentProps<any> {}

const CartDropdown: React.FC<ICartDropdownProps> = ({ history }) => {
  const cartItems: cartItemProps[] = Store.getState().cartReducer.items;

  const showCartItems = () => {
    if (cartItems.length > 0) {
      return cartItems.map((cartItem: cartItemProps, idx: number) => (
        <CartItem key={idx} cartItem={cartItem} />
      ));
    } else {
      return <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>;
    }
  };
  return (
    <CartDropdownContainer>
      <CartItemsContainer>{showCartItems()}</CartItemsContainer>
      <CustomButton onClick={() => history.push("/checkout")}>
        GO TO CHECKOUT
      </CustomButton>
    </CartDropdownContainer>
  );
};

export default withRouter(CartDropdown);
