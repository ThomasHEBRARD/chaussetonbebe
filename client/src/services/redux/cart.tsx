import arrayReplace from "../../helpers/arrayReplace";
import removeFromArray from "../../helpers/removeFromArray";

export interface cartProps {
  totalCount: number;
  totalCost: number;
  items: { id: any; price: number; count: any }[];
}

const cartIntitialState: cartProps = {
  totalCount: 0,
  totalCost: 0,
  items: [],
};

const cartReducer = (
  state: cartProps = cartIntitialState,
  action: { type: string; item: { id: string; price: number } }
) => {
  switch (action.type) {
    case "ADD_ITEM":
      const isItemToAddIncart = state.items.some(
        (item) => item.id === action.item.id
      );
      if (isItemToAddIncart) {
        let newItemData = state.items.find(
          (item) => item.id === action.item.id
        );

        newItemData.count++;

        return {
          totalCount: state.totalCount + 1,
          items: arrayReplace(
            state.items,
            newItemData,
            (item: { id: any; count: any }) => item.id === action.item.id
          ),
        };
      } else {
        return {
          totalCount: state.totalCount + 1,
          items: [
            ...state.items,
            { id: action.item.id, price: action.item.price, count: 1 },
          ],
        };
      }

    case "REMOVE_ITEM":
      const isItemToRemoveIncart = state.items.some(
        (item) => item.id === action.item.id
      );
      if (isItemToRemoveIncart) {
        let newItemData = state.items.find(
          (item) => item.id === action.item.id
        );

        newItemData.count++;

        return {
          totalCount: state.totalCount - 1,
          totalCost: state.totalCost - action.item.price,
          items: removeFromArray(
            state.items,
            (item: { itemId: any; count: any }) =>
              item.itemId === action.item.id
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
