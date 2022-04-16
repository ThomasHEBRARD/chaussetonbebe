import arrayReplace from "../../helpers/arrayReplace";
import removeFromArray from "../../helpers/removeFromArray";

import cartItemProps from "../../interface/cartItem.interface";
import ItemProps from "../../interface/item.interface";

export interface cartProps {
  totalCount: number;
  totalCost: number;
  items: cartItemProps[];
}

const cartIntitialState: cartProps = {
  totalCount: 0,
  totalCost: 0,
  items: [],
};

const cartReducer = (
  state: cartProps = cartIntitialState,
  action: { type: string; item: ItemProps }
) => {
  console.log("state", state);
  console.log("action", action);
  switch (action.type) {
    case "ADD_ONE_ITEM":
      const isItemToAddIncart = state.items.some(
        (item) => item._id === action.item._id
      );
      if (isItemToAddIncart) {
        let newItemData = state.items.find(
          (item: cartItemProps) => item._id === action.item._id
        );

        newItemData.count++;

        return {
          totalCost: state.totalCost + action.item.price,
          totalCount: state.totalCount + 1,
          items: arrayReplace(
            state.items,
            newItemData,
            (item: cartItemProps) => item._id === action.item._id
          ),
        };
      } else {
        return {
          totalCost: state.totalCost + action.item.price,
          totalCount: state.totalCount + 1,
          items: [...state.items, { ...action.item, count: 1 }],
        };
      }

    case "REMOVE_ONE_ITEM":
      const isItemToRemoveIncart = state.items.some(
        (item) => item._id === action.item._id
      );
      if (isItemToRemoveIncart) {
        let newItemData = state.items.find(
          (item) => item._id === action.item._id
        );
        if (newItemData.count === 1) {
          return {
            totalCount: state.totalCount - 1,
            totalCost: state.totalCost - action.item.price,
            items: removeFromArray(
              state.items,
              (item: cartItemProps) => item._id === action.item._id
            ),
          };
        } else {
          newItemData.count--;

          return {
            totalCount: state.totalCount - 1,
            totalCost: state.totalCost - action.item.price,
            items: state.items.map((item) => {
              if (item._id === action.item._id) {
                return newItemData;
              }
            }),
          };
        }
      } else {
        return state;
      }

    case "REMOVE_ALL_ITEM":
      const itemToRemove = state.items.find(
        (item) => item._id === action.item._id
      );
      if (itemToRemove) {
        return {
          totalCount: state.totalCount - itemToRemove.count,
          totalCost: state.totalCost - itemToRemove.count * itemToRemove.price,
          items: removeFromArray(
            state.items,
            (item: cartItemProps) => item._id === action.item._id
          ),
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default cartReducer;
