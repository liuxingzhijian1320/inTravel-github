import { get } from '../api/request';

// 获取验证码列表
export async function getCommentList(params) {
  const url = `/api/comment/list`;
  const result = await get(url, params);
  return result.data;
}
