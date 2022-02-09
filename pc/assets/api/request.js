import axios from 'axios'
import { Message } from 'element-ui'
// import store from "../../store";
const token = 123

const ERROR_MSG = '服务器异常，请稍后操作'

const instance = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
})

export const get = (url, params = {}) => {
  // const token = store.getters.userInfo?.token || "";
  // console.log("token", token);

  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url: url,
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(
      (response) => {
        if (response.data.code === 200) {
          resolve(response.data)
        } else {
          const title = response?.data?.message
            ? response.data.message
            : ERROR_MSG
          Message.error(title)
          reject(title)
        }
      },
      (err) => {
        if (JSON.stringify(err).search(/401/) > -1) {
          // showToast({ title: "身份过期，请重新登录" });
          Message.error('身份过期，请重新登录')
        } else {
          Message.error(ERROR_MSG)
        }
        reject(ERROR_MSG)
      }
    )
  })
}

export const post = (url, data = {}) => {
  // const token = store.getters.userInfo?.token || "";
  // console.log("token", token);

  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (response) => {
          if (response.data.code === 200) {
            resolve(response.data)
          } else {
            const title = response?.data?.message
              ? response.data.message
              : ERROR_MSG
            Message.error(title)
            reject(title)
          }
        },
        (err) => {
          if (JSON.stringify(err).search(/401/) > -1) {
            Message.error('身份过期，请重新登录')
          } else {
            Message.error(ERROR_MSG)
          }
          reject(ERROR_MSG)
        }
      )
  })
}
