import ItemProps from '../../interface/item.interface';

export const addPriceToTotal = (totalCost: number, cartItemPrice: number): number => {
  return totalCost + cartItemPrice;
}

export const removePriceFromTotal = (totalCost: number, cartItemPrice: number): number => {
  return totalCost - cartItemPrice;
}

export const addItemToCount = (cartItemCount: number, count: number): number => {
  return cartItemCount + count;
}

export const removeItemFromCount = (cartItemCount: number, count: number): number => {
  return cartItemCount - count;
}

export const addItemToCart = (cartItems: ItemProps[], cartItemToAdd: ItemProps) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.name === cartItemToAdd.name
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.name === cartItemToAdd.name
        ? { ...cartItem, stock: cartItem.stock + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, stock: 1 }];
};

export const removeItemFromCart = (cartItems: ItemProps[], cartItemToRemove: ItemProps): ItemProps[] => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.name === cartItemToRemove.name
  );

  if (existingCartItem.stock === 1) {
    return cartItems.filter(cartItem => cartItem.name !== cartItemToRemove.name);
  }

  return cartItems.map(cartItem =>
    cartItem.name === cartItemToRemove.name
      ? { ...cartItem, stock: cartItem.stock - 1 }
      : cartItem
  );
};

export const filterItemFromCart = (cartItems: ItemProps[], item: ItemProps) =>
  cartItems.filter(cartItem => cartItem.name !== item.name);

export const getCartItemsCount = (cartItems: ItemProps[]) =>
  cartItems.reduce(
    (accumalatedQuantity: number, cartItem: ItemProps) => accumalatedQuantity + cartItem.stock,
    0
  );

export const getCartTotalCost = (cartItems: ItemProps[]) =>
  cartItems.reduce(
    (accumalatedQuantity: number, cartItem: ItemProps) =>
      accumalatedQuantity + cartItem.stock * cartItem.price,
    0
  );
