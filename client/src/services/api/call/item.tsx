import axios from "axios";

import ApiClient, { getHeaders } from "../utils/api.utils";

class ItemClient extends ApiClient {
  public constructor() {
    super();
    this.paths = {
      all: "items/all",
      items: "items/",
    };
  }

  public getAllItems = async (): Promise<any> => {
    const response = await axios.get(this.url("all"), getHeaders());
    return response.data;
  };

  public getItemById = async (itemId: string): Promise<any> => {
    const response = await axios.get(
      `${this.url("items")}${encodeURIComponent(itemId)}`,
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  };
}

const client = new ItemClient();

export default client;
