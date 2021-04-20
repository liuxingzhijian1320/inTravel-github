import { get, post } from '../api/request';

// 登录
export async function userLogin(params) {
  const url = `/api/user/adminLogin`;
  const result = await post(url, params);
  return result.data;
}

// 登录
export async function userDelOne(params) {
  const url = `/api/user/del`;
  const result = await post(url, params);
  return result;
}

// 注册
export async function userRegister(params) {
  const url = `/api/user/create`;
  const result = await post(url, params);
  return result;
}

// 列表
export async function userList(params) {
  const url = `/api/user/list`;
  const result = await get(url, params);
  return result.data;
}

// 详情
export async function userDetail(params) {
  const url = `/api/user/detail`;
  const result = await get(url, params);
  return result.data;
}

// 升级管理员
export async function upgradeAdmin(params) {
  const url = `/api/user/upgrade`;
  const result = await post(url, params);
  return result;
}

// 降级为游客
export async function upgradeVisitor(params) {
  const url = `/api/user/downgrade`;
  const result = await post(url, params);
  return result;
}

// 用户信息编辑
export async function userUpdate(params) {
  const url = `/api/user/update`;
  const result = await post(url, params);
  return result;
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
  const url = `/api/user/resetPasswordByAdmin`;
  const result = await post(url, params);
  return result.data;
}
