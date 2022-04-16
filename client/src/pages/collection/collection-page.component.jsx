import React, { useState, useEffect } from "react";
import "./collection-page.styles.scss";

import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer,
} from "./collection-page.styles";

import CollectionItem from "../../components/collection-item/collection-item.component";
import CollectionClient from "../../services/api/call/collection";

const CollectionPage = ({ match }) => {
  const [collection, setCollection] = useState();

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
