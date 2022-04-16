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
  cartItems: ItemProps[] | [];
  addItem: Function;
  removeItem: Function;
  clearCartItem: Function;
  cartItemsCount: number;
  totalCost: number;
}

interface ICartProps {
  children: React.ReactNode;
}

const initialCartItems = [""];

const localCartItems = JSON.parse(localStorage.getItem("cartItems"));

export const CartContext = createContext<ICart>({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearCartItem: () => {},
  cartItemsCount: 0,
  totalCost: 0,
});

const CartProvider: React.FC<ICartProps> = ({ children }) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<Array<ItemProps | any> | []>(
    localCartItems || initialCartItems
  );
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  const dispatch = useDispatch();

  const toggleHidden = useCallback(() => setHidden(!hidden), [hidden]);

  const addItem = useCallback(
    (item: ItemProps) => {
      const action = {
        type: "ADD_ITEM",
        item: { id: item.name, price: item.price },
      };
      dispatch(action);

      setCartItems(addItemToCart(cartItems, item));
      setTotalCost(addPriceToTotal(totalCost, item.price));
      setCartItemsCount(addItemToCount(cartItemsCount, 1));
    },
    [cartItems]
  );

  const removeItem = useCallback(
    (item: ItemProps) => {
      const action = {
        type: "REMOVE_ITEM",
        item: { id: item.name, price: item.price },
      };
      dispatch(action);

      setCartItems(removeItemFromCart(cartItems, item));
      setTotalCost(removePriceFromTotal(totalCost, item.price));
      setCartItemsCount(removeItemFromCount(cartItemsCount, 1));
    },
    [cartItems]
  );

  const clearCartItem = useCallback(
    (item: ItemProps) => setCartItems(filterItemFromCart(cartItems, item)),
    [cartItems]
  );

  useEffect(() => {
    setTotalCost(getCartTotalCost(cartItems));
    setCartItemsCount(getCartItemsCount(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        cartItemsCount,
        totalCost,
        clearCartItem,
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
