import React, { useContext } from "react";
import { connect, useDispatch } from "react-redux";
import {
  CollectionItemContainer,
  AddButton,
  BackgroundImage,
  CollectionFooterContainer,
  NameContainer,
  PriceContainer,
} from "./collection-item.styles";
import { ReducerStateProps } from "../../services/redux/combinedReducers";

import ItemProps from "../../interface/item.interface";

const CollectionItem: React.FC<{
  item: ItemProps;
}> = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <CollectionItemContainer>
      <BackgroundImage className="image" imageUrl={item.imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{item.name}</NameContainer>
        <PriceContainer>€{item.price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton
        onClick={() => {
          const action = {
            type: "ADD_ONE_ITEM",
            item: item,
          };
          dispatch(action);
        }}
        inverted="true"
      >
        Add to Cart
      </AddButton>
    </CollectionItemContainer>
  );
};

const mapStateToProps = (state: ReducerStateProps) => {
  return { items: state.cartReducer.items };
};
const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return { dispatch: (action: any) => dispatch(action) };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);
