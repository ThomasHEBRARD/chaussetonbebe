import React, { createContext, useState } from "react";

import Section from "../../interface/section.interface";
import CollectionItem from "../../interface/collection-item.interface";
import collectionClient from "../../services/api/call/collection";
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
    collectionClient.getCollectionSections().then((sections) => {
      setCollectionSections(sections);
    });
  };

  const getCollectionItems = () => {
    collectionClient.getCollections().then((collections: any) => {
      setCollectionItems(collections);
    });
  };

  // TODO: Create backend route to look for single collection instead of fetching all collections and filtering
  const getSingleCollection = (collectionTitle: string) => {
    collectionClient.getCollections().then((collections: any) => {
      const foundCollection = collections.data.filter(
        (collection: SingleCollection) =>
          collection.title.toLowerCase() === collectionTitle
      );
      setSingleCollection(foundCollection[0]);
    });
  };

  // Add Collections to the database
  // const createCol = (collectionData) => {
  //   createCollection(collectionData)
  //     .then(collection => console.log(collection))
  //     // .catch(error => console.log(error));
  // }

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
