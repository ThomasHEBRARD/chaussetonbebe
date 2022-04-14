import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const makeUrl = (url: string) => baseUrl + url;

const changeResponseForHeroku = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=utf-8",
  },
};

export const getCollectionSections = async () => {
  const result: any = await axios.get(
    makeUrl("api/collections/sections"),
    changeResponseForHeroku
  );
  return result.data;
};

export const getCollections = async () => {
  const result: any = await axios.get(
    makeUrl("api/collections/collection"),
    changeResponseForHeroku
  );
  return result.data;
};

// export const createCollection = (collectionData) => {
//   return axios.post('/api/collections/collection', collectionData)
// };
