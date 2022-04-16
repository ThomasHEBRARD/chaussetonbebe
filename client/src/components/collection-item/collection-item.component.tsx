import React, { useContext } from "react";

import {
  CollectionItemContainer,
  AddButton,
  BackgroundImage,
  CollectionFooterContainer,
  NameContainer,
  PriceContainer,
} from "./collection-item.styles";

import { CartContext } from "../../providers/cart/cart.provider";
import ItemProps from "../../interface/item.interface";

interface ICollectionItemProps {
  item: ItemProps;
}

const CollectionItem: React.FC<ICollectionItemProps> = ({ item }) => {
  const { name, price, imageUrl } = item;
  const { addItem } = useContext(CartContext);

  return (
    <CollectionItemContainer>
      <BackgroundImage className="image" imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>${price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton onClick={() => addItem(item)} inverted="true">
        Add to Cart
      </AddButton>
    </CollectionItemContainer>
  );
};

export default CollectionItem;
