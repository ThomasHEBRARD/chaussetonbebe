import arrayReplace from "../../helpers/arrayReplace";
import removeFromArray from "../../helpers/removeFromArray";

import ItemProps from "../../interface/item.interface";

interface cartItemProps extends ItemProps {
  count: number;
}
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
  switch (action.type) {
    case "ADD_ITEM":
      const isItemToAddIncart = state.items.some(
        (item) => item._id === action.item._id
      );
      if (isItemToAddIncart) {
        let newItemData = state.items.find(
          (item: ItemProps) => item._id === action.item._id
        );

        newItemData.stock++;

        return {
          totalCost: state.totalCost + action.item.price,
          totalCount: state.totalCount + 1,
          items: arrayReplace(
            state.items,
            newItemData,
            (item: ItemProps) => item._id === action.item._id
          ),
        };
      } else {
        return {
          totalCost: state.totalCost + action.item.price,
          totalCount: state.totalCount + 1,
          items: [...state.items, { ...action.item, count: 1 }],
        };
      }

    case "REMOVE_ITEM":
      const isItemToRemoveIncart = state.items.some(
        (item) => item._id === action.item._id
      );
      if (isItemToRemoveIncart) {
        let newItemData = state.items.find(
          (item) => item._id === action.item._id
        );

        newItemData.stock++;

        return {
          totalCount: state.totalCount - 1,
          totalCost: state.totalCost - action.item.price,
          items: removeFromArray(
            state.items,
            (item: ItemProps) => item._id === action.item._id
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
