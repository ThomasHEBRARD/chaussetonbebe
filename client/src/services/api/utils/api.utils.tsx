import axios from "axios";

export const getHeaders = () => {
  const h: { [k: string]: string } = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=utf-8",
  };
  return h;
};

export class CanceledRequestError extends Error {}

class ApiClient {
  private baseURL?: string;
  protected paths: { [k: string]: string };

  public constructor() {
    this.baseURL = process.env.REACT_APP_BASE_URL + "api/";
    this.paths = {};

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // If we have an HTTP error
        if (error.response) {
          if (error.response.status === 403) {
            console.log("error 403");
            // logger.warn("An unexpected 403 error occured. Logging out...");
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public setPath(key: string, value: string) {
    this.paths[key] = value;
  }

  public url(key: string) {
    return `${this.baseURL}${this.paths[key]}`;
  }
}

export default ApiClient;
