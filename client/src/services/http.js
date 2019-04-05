import * as AppConfig from "./api";

export function ApiCall(url, body, method = "POST") {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  const params = {
    method: method,
    headers: headers
  };

  if (body) {
    params.body = JSON.stringify(body);
  }

  return fetch(url, params).then(async response => {
    if (response.status >= 400 && response.status < 600) {
      let res = await response.json();
      throw new Error(res.message);
    }
    return response.json();
  });
}

export const RestApi = {
  loadEvents: () => {
    return ApiCall(AppConfig.LIST_EVENTS(), null, "GET");
  },
  addEvent: data => {
    return ApiCall(AppConfig.ADD_EVENT(), data, "POST");
  },
  removeEvent: id => {
    return ApiCall(AppConfig.REMOVE_EVENT(), { _id: id }, "POST");
  },
  login: data => {
    return ApiCall(AppConfig.LOGIN(), data, "POST");
  },
  register: data => {
    return ApiCall(AppConfig.REGISTER(), data, "POST");
  },
  getUserInfo: () => {
    return ApiCall(AppConfig.USERINFO(), null, "GET");
  }
};
