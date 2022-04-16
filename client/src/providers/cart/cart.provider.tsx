import React, { createContext, useState, useEffect, useCallback } from "react";

import ShopItem from "../../interface/shop-item.interface";
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
  cartItems: ShopItem[] | [];
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
// const initialCartItemsCount = 0;
// const initialtotalCost = 0;

const localCartItems = JSON.parse(localStorage.getItem("cartItems"));
// const localCartItemCount = JSON.parse(localStorage.getItem('cartItemsCount'));
// const localTotalCost = JSON.parse(localStorage.getItem('totalCost'));

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
  const [cartItems, setCartItems] = useState<Array<ShopItem | any> | []>(
    localCartItems || initialCartItems
  );
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  const dispatch = useDispatch();

  const toggleHidden = useCallback(() => setHidden(!hidden), [hidden]);

  const addItem = useCallback(
    (item: ShopItem) => {
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
    (item: ShopItem) => {
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
    (item: ShopItem) => setCartItems(filterItemFromCart(cartItems, item)),
    [cartItems]
  );

  useEffect(() => {
    setTotalCost(getCartTotalCost(cartItems));
    setCartItemsCount(getCartItemsCount(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // localStorage.setItem('totalCost', JSON.stringify(totalCost));
    // localStorage.setItem('cartItemsCount', JSON.stringify(cartItemsCount));
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
  return { items: state.basketReducer.items };
};
const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return { dispatch: (action: any) => dispatch(action) };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartProvider);
