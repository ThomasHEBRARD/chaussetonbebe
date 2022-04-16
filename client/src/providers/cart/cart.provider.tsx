import React, { createContext, useState, useEffect, useCallback } from "react";

import ItemProps from "../../interface/item.interface";
import { connect, useDispatch } from "react-redux";
import { ReducerStateProps } from "../../services/redux/combinedReducers";
import {
  addItemToCart,
  removeItemFromCart,
  addPriceToTotal,
  removePriceFromTotal,
  addItemToCount,
  removeItemFromCount,
  filterItemFromCart,
  getCartItemsCount,
  getCartTotalCost,
} from "./cart.utils";

interface ICart {
  hidden: boolean;
  toggleHidden: Function;
}

interface ICartProps {
  children: React.ReactNode;
}

export const CartContext = createContext<ICart>({
  hidden: true,
  toggleHidden: () => {},
});

const CartProvider: React.FC<ICartProps> = ({ children }) => {
  const [hidden, setHidden] = useState<boolean>(true);

  const dispatch = useDispatch();

  const toggleHidden = useCallback(() => setHidden(!hidden), [hidden]);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const mapStateToProps = (state: ReducerStateProps) => {
  return { items: state.cartReducer.items };
};
const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return { dispatch: (action: any) => dispatch(action) };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartProvider);
