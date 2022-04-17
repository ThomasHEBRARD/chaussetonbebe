import React from "react";

import "./checkout.styles.scss";
import { connect } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import Stripe from "../../components/stripe-button/stripe-button.component";
import { ReducerStateProps } from "../../services/redux/combinedReducers";
import cartItemProps from "../../interface/cartItem.interface";
import Store from "../../services/redux/store";

const CheckoutPage = () => {
  const cartItems: cartItemProps[] = Store.getState().cartReducer.items;
  const totalCost: string = Store.getState().cartReducer.totalCost;

  return (
    <>
      <div className="checkout-page">
        <div className="checkout-header">
          <div className="header-block">
            <span>Product</span>
          </div>
          <div className="header-block">
            <span>Description</span>
          </div>
          <div className="header-block">
            <span>Quantity</span>
          </div>
          <div className="header-block">
            <span>Price</span>
          </div>
          <div className="header-block">
            <span>Remove</span>
          </div>
        </div>
        {cartItems?.map((cartItem, idx) => (
          <CheckoutItem key={idx} cartItem={cartItem}></CheckoutItem>
        ))}
        <div className="total">
          <span>Total: €{totalCost}</span>
        </div>
      </div>
      <Stripe price={totalCost} />
    </>
  );
};

const mapStateToProps = (state: ReducerStateProps) => {
  return state;
};
const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return { dispatch: (action: any) => dispatch(action) };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
