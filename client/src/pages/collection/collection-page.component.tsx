import React, { useState, useEffect } from "react";
import "./collection-page.styles.scss";

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer,
} from "./collection-page.styles";

import CollectionProps from "../../interface/collection.interface";

import CollectionItem from "../../components/collection-item/collection-item.component";
import CollectionClient from "../../services/api/call/collection";

const CollectionPage: React.FC<any> = ({ match }) => {
  const [collection, setCollection] = useState<CollectionProps | undefined>(
    undefined
  );

  useEffect(() => {
    CollectionClient.getCollectionById(match.params.collectionId).then(
      (collection) => {
        setCollection(collection);
      }
    );
  }, []);

  return (
    <CollectionPageContainer>
      <CollectionTitle>{collection?.name}</CollectionTitle>
      <CollectionItemsContainer>
        {collection?.items.map((item, idx) => (
          <CollectionItem key={idx} item={item}></CollectionItem>
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
};

export default CollectionPage;
