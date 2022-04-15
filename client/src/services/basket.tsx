import arrayReplace from "../helpers/arrayReplace";

export interface basketProps {
  totalCount: number;
  items: { itemId: any; count: any }[];
}

const basketIntitialState: basketProps = {
  totalCount: 0,
  items: [],
};

const basketReducer = (
  state: basketProps = basketIntitialState,
  action: { type: string; value: string }
) => {
  switch (action.type) {
    case "ADD_ITEM":
      const isItemInBasket = state.items.some(
        (item) => item.itemId === action.value
      );
      if (isItemInBasket) {
        let newItemData = state.items.find(
          (item) => item.itemId === action.value
        );

        newItemData.count++;

        return {
          totalCount: state.totalCount + 1,
          items: arrayReplace(
            state.items,
            newItemData,
            (item: { itemId: any; count: any }) => item.itemId === action.value
          ),
        };
      } else {
        return {
          totalCount: state.totalCount + 1,
          items: [...state.items, { itemId: action.value, count: 0 }],
        };
      }

    default:
      return state;
  }
};

export default basketReducer;
