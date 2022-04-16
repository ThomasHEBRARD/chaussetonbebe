import React from "react";
import { connect, useDispatch } from "react-redux";
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
import { ReducerStateProps } from "../../services/redux/combinedReducers";

interface ICartDropdownProps extends RouteComponentProps<any> {}

const CartDropdown: React.FC<ICartDropdownProps> = ({ history }) => {
  const cartItems: cartItemProps[] = Store.getState().cartReducer.items;
  const dispatch = useDispatch();

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
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          const action = { type: "TOGGLE_DROPDOWN" };
          dispatch(action);
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </CartDropdownContainer>
  );
};

const mapStateToProps = (state: ReducerStateProps) => {
  return { isOpen: state.cartReducer.isOpen };
};
const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return { dispatch: (action: any) => dispatch(action) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CartDropdown));
