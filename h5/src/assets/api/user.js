import { get, post } from "../api/request";

// 登录
export async function userLogin(params) {
  const url = `/api/user/login`;
  const result = await post(url, params);
  return result.data;
}

// 注册
export async function userRegister(params) {
  const url = `/api/user/create`;
  const result = await post(url, params);
  return result.data;
}

// 详情
export async function userDetail(params) {
  const url = `/api/user/detail`;
  const result = await get(url, params);
  return result.data;
}

// 用户信息编辑
export async function userUpdate(params) {
  const url = `/api/user/update`;
  const result = await post(url, params);
  return result.data;
}

// 密码编辑
export async function userPassUpdate(params) {
  const url = `/api/user/updatePassword`;
  const result = await post(url, params);
  return result.data;
}

// 发送邮箱
export async function sendEmail(params) {
  const url = `/api/email/send`;
  const result = await post(url, params);
  return result.data;
}

// 重置
export async function resetPass(params) {
  const url = `/api/user/resetPassword`;
  const result = await post(url, params);
  return result.data;
}
