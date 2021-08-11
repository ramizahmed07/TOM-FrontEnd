import { set, includes, isEmpty } from "lodash";

import { loadRefreshToken, loadToken, saveTokens } from "./storage";
import { baseUrl as apiEndpoint } from "./constants";
interface ITomService {
  url: string;
  method: string;
  body?: any;
  third_party?: boolean;
  formData?: boolean;
}

interface IReqBody {
  method: string;
  headers: any;
  body?: any;
}

const black_list = ["/login/"];

const handleErrors = (
  json: any,
  url: string,
  third_party: boolean | undefined
) => {
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
  return { data: { data: json?.data, pagination: json?.pagination } };
};

export const tomService =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, third_party, method, body, formData }: ITomService) => {
    const headers = {};

    let path = third_party ? url : `${baseUrl}${url}`;
    if (!formData) {
      set(headers, "Accept", "application/json");
      set(headers, "Content-Type", "application/json");
    }

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

    if (formData) {
      reqBody.body = body;
    }
    if (body && !isEmpty(body) && !formData) {
      reqBody.body = JSON.stringify(body);
    }

    try {
      let res = await fetch(path, reqBody);
      if (res.headers.get("Content-Type") === "text/csv") {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${res.url.split("/api/")[1].split("/")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        return { data: [] };
      } else {
        const json = await res.json();
        let refreshed = false;
        if (json.code === 1002 && json.message === "Invalid Token") {
          await new Promise(async (res, rej) => {
            const refresh = loadRefreshToken();
            if (refresh) {
              const res = await fetch(`${apiEndpoint}/auth/refresh-token/`, {
                method: "POST",
                headers,
                body: JSON.stringify({
                  refresh,
                }),
              });
              const json = await res.json();
              saveTokens({ access: json.data.access, refresh });
              set(headers, "Authorization", `Bearer ${json.data.access}`);
              refreshed = true;
            }
            res(true);
          });
          if (refreshed) {
            let res = await fetch(path, reqBody);
            let json = await res.json();
            refreshed = false;
            return handleErrors(json, url, third_party);
          }
        }
        return handleErrors(json, url, third_party);
      }
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
