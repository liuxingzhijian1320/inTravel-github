import { get, post } from "../api/request";

// 酒店评论列表
export async function getCommentList(params) {
  const url = `/api/comment/list`;
  const result = await get(url, params);
  return result.data;
}

// 创建评论
export async function createComment(params) {
  const url = `/api/comment/create`;
  const result = await post(url, params);
  return result;
}

// 回复评论
export async function createReply(params) {
  const url = `/api/reply/create`;
  const result = await post(url, params);
  return result;
}
