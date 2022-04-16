import axios from "axios";

import ApiClient, { getHeaders } from "../utils/api.utils";

class CollectionClient extends ApiClient {
  public constructor() {
    super();
    this.paths = {
      sections: "collections/sections",
      collection: "collections/collection",
    };
  }

  public getCollectionSections = async (): Promise<any> => {
    const response = await axios.get(this.url("sections"), getHeaders());
    return response.data;
  };

  public getCollections = async (): Promise<any> => {
    const response = await axios.get(this.url("collection"), getHeaders());
    return response.data;
  };
}

const client = new CollectionClient();

export default client;
