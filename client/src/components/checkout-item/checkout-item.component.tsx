import React from "react";
import "./checkout-item.styles.scss";
import { connect, useDispatch } from "react-redux";
import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer,
} from "./checkout-item.styles";

import cartItemProps from "../../interface/cartItem.interface";
import { ReducerStateProps } from "../../services/redux/combinedReducers";
interface ICheckoutItemProps {
  cartItem: cartItemProps;
}

const CheckoutItem: React.FC<ICheckoutItemProps> = ({ cartItem }) => {
  const dispatch = useDispatch();

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={cartItem.imageUrl} alt="item" />
      </ImageContainer>
      <TextContainer>{cartItem.name}</TextContainer>
      <QuantityContainer>
        <div
          onClick={() => {
            const action = {
              type: "REMOVE_ONE_ITEM",
              item: cartItem,
            };
            dispatch(action);
          }}
        >
          &#10094;
        </div>
        <span>{cartItem.count}</span>
        <div
          onClick={() => {
            const action = {
              type: "ADD_ONE_ITEM",
              item: cartItem,
            };
            dispatch(action);
          }}
        >
          &#10095;
        </div>
      </QuantityContainer>
      <TextContainer>€{cartItem.price}</TextContainer>
      <RemoveButtonContainer
        onClick={() => {
          const action = {
            type: "REMOVE_ALL_ITEM",
            item: cartItem,
          };
          dispatch(action);
        }}
      >
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

const mapStateToProps = (state: ReducerStateProps) => {
  return { items: state.cartReducer.items };
};
const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return { dispatch: (action: any) => dispatch(action) };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);
