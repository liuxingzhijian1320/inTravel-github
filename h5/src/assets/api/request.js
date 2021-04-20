import axios from "axios";
import { showToast } from "../scripts/tools";
import store from "../../store";

const ERROR_MSG = "服务器异常，请稍后操作";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
});

export const get = (url, params = {}) => {
  const token = store.getters.userInfo?.token || "";
  // console.log("token", token);

  return new Promise((resolve, reject) => {
    instance({
      method: "get",
      url: url,
      params: params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(
      response => {
        if (response.data.code === 200) {
          resolve(response.data);
        } else {
          const title = response?.data?.message
            ? response.data.message
            : ERROR_MSG;
          showToast({ title });
          reject(title);
        }
      },
      err => {
        if (JSON.stringify(err).search(/401/) > -1) {
          showToast({ title: "身份过期，请重新登录" });
        } else {
          showToast({ title: ERROR_MSG });
        }
        reject(ERROR_MSG);
      }
    );
  });
};

export const post = (url, data = {}) => {
  const token = store.getters.userInfo?.token || "";
  // console.log("token", token);

  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then(
        response => {
          if (response.data.code === 200) {
            resolve(response.data);
          } else {
            const title = response?.data?.message
              ? response.data.message
              : ERROR_MSG;
            showToast({ title });
            reject(title);
          }
        },
        err => {
          if (JSON.stringify(err).search(/401/) > -1) {
            showToast({ title: "身份过期，请重新登录" });
          } else {
            showToast({ title: ERROR_MSG });
          }
          reject(ERROR_MSG);
        }
      );
  });
};
