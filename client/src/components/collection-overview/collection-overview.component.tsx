import React, { useState, useEffect } from "react";

import CollectionPreview from "../collection-preview/collection-preview.component";
import { CollectionOverviewContainer } from "./collection-overview.styles";

import CollectionClient from "../../services/api/call/collection";
import ItemProps from "../../interface/item.interface";

interface ICollectionsOverviewProps {}

const CollectionsOverview: React.FC<ICollectionsOverviewProps> = () => {
  const [collections, setCollections] = useState<any>([]);

  useEffect(() => {
    CollectionClient.getCollections().then((collections: any) => {
      setCollections(collections);
    });
  }, []);

  return (
    <CollectionOverviewContainer>
      {collections?.map(
        (
          collection: {
            _id: string;
            name: string;
            routeName: string;
            items: ItemProps[];
          },
          idx: React.Key
        ) => {
          return (
            <CollectionPreview
              key={idx}
              name={collection.name}
              _id={collection._id}
              items={collection.items}
            />
          );
        }
      )}
    </CollectionOverviewContainer>
  );
};

export default CollectionsOverview;
