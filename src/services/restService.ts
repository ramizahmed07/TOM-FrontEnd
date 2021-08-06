import { set, includes, isEmpty } from "lodash";

import { loadToken, saveTokens } from "./storage";

interface ITomService {
  url: string;
  method: string;
  body: any;
  third_party?: boolean;
}

interface IReqBody {
  method: string;
  headers: any;
  body?: any;
}

const black_list = ["/login/"];
export const tomService =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, third_party, method, body }: ITomService) => {
    const headers = {};

    let path = third_party ? url : `${baseUrl}${url}`;

    set(headers, "Accept", "application/json");
    set(headers, "Content-Type", "application/json");

    // @TODO: Implement Expiration of token
    let accessToken = loadToken();

    if (!includes(black_list, url) && accessToken && !third_party) {
      set(headers, "Authorization", `Bearer ${accessToken}`);
    } else {
      // console.log("Is access token set?", loadToken());
    }

    const reqBody: IReqBody = {
      method,
      headers,
    };

    if (!isEmpty(body)) {
      reqBody.body = JSON.stringify(body);
    }

    try {
      const res = await fetch(path, reqBody);
      const json = await res.json();
      console.log("JSON<>", json);
      if (!json.success) throw json;

      if (includes(black_list, url)) {
        const tokens = json?.data?.token;
        saveTokens(tokens);
      }
      if (third_party) {
        return {
          data: json,
        };
      }
      return { data: json?.data };
    } catch (error) {
      let err = error;
      console.log("restService => TomService : error=", err);
      return {
        error: {
          success: err?.success,
          message: err?.message,
          error: err?.error,
          code: err?.code,
          data: err?.data,
        },
      };
    }
  };
