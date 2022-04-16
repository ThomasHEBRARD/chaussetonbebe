import axios from "axios";

import ApiClient, { getHeaders } from "../utils/api.utils";

class CollectionClient extends ApiClient {
  public constructor() {
    super();
    this.paths = {
      all: "collections/all",
      collection: "collections/",
    };
  }

  public getCollections = async (): Promise<any> => {
    const response = await axios.get(this.url("all"), getHeaders());
    return response.data;
  };

  public getCollectionById = async (collectionId: string): Promise<any> => {
    const response = await axios.get(
      `${this.url("collection")}${encodeURIComponent(collectionId)}`,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  };
}

const client = new CollectionClient();

export default client;
