import React from "react";

import { connect, useDispatch } from "react-redux";
import Store from "../../services/redux/store";
import { ReducerStateProps } from "../../services/redux/combinedReducers";

import {
  CartContainer,
  ShoppingIcon,
  ItemCountContainer,
} from "./cart-icon.styles";

const CartIcon: React.FC = () => {
  const totalCount = Store.getState().cartReducer.totalCount;
  const dispatch = useDispatch();

  return (
    <CartContainer
      onClick={() => {
        const action = { type: "TOGGLE_DROPDOWN" };
        dispatch(action);
      }}
    >
      <ShoppingIcon />
      <ItemCountContainer>{totalCount}</ItemCountContainer>
    </CartContainer>
  );
};

const mapStateToProps = (state: ReducerStateProps) => {
  return { isOpen: state.cartReducer.isOpen };
};
const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return { dispatch: (action: any) => dispatch(action) };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
