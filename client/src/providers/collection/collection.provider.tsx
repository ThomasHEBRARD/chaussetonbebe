import React, { createContext, useState } from "react";

import Section from "../../interface/section.interface";
import CollectionItem from "../../interface/collection-item.interface";
import CollectionClient from "../../services/api/call/collection";
import ItemClient from "../../services/api/call/item";
interface ICollection {
  getSections: Function;
  getCollectionItems: Function;
  collectionSections: [] | Section[];
  collectionItems: [] | CollectionItem[];
  singleCollection: {};
  getSingleCollection: Function;
}

interface SingleCollection {
  title: string;
  routeName: string;
  items: CollectionItem[];
}

interface ICartProps {
  children: React.ReactNode;
}

export const CollectionContext = createContext<ICollection>({
  getSections: () => {},
  getCollectionItems: () => {},
  collectionSections: [],
  collectionItems: [],
  singleCollection: {},
  getSingleCollection: () => {},
});

const CollectionProvider: React.FC<ICartProps> = ({ children }) => {
  const [collectionSections, setCollectionSections] = useState([]);
  const [collectionItems, setCollectionItems] = useState([]);
  const [singleCollection, setSingleCollection] = useState({
    title: "",
    routeName: "string",
    items: [],
  });

  const getSections = () => {
    CollectionClient.getCollectionSections().then((sections) => {
      setCollectionSections(sections);
    });
  };

  const getCollectionItems = () => {
    CollectionClient.getCollections().then((collections: any) => {
      setCollectionItems(collections);
    });
  };

  // TODO: Create backend route to look for single collection instead of fetching all collections and filtering
  const getSingleCollection = (collectionTitle: string) => {
    CollectionClient.getCollections().then((collections: any) => {
      const foundCollection = collections.data.filter(
        (collection: SingleCollection) =>
          collection.title.toLowerCase() === collectionTitle
      );
      setSingleCollection(foundCollection[0]);
    });
  };

  return (
    <CollectionContext.Provider
      value={{
        getSections,
        collectionSections,
        getCollectionItems,
        getSingleCollection,
        singleCollection,
        collectionItems,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
