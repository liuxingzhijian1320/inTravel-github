import { get, post } from "../api/request";

// 获取酒店列表
export async function getHotelList(params) {
  const url = `/api/hotel/list`;
  const result = await get(url, params);
  return result.data;
}

// 获取酒店详情
export async function getHotelDetail(params) {
  const url = `/api/hotel/detail`;
  const result = await get(url, params);
  return result.data;
}

// 保存搜素记录
export async function postRecordList(params) {
  const url = `/api/record/create`;
  const result = await post(url, params);
  return result.data;
}
// 查询搜素记录
export async function getRecordList(params) {
  const url = `/api/record/list`;
  const result = await get(url, params);
  return result.data;
}

// 查询房间列表
export async function getRoomList(params) {
  const url = `/api/room/list`;
  const result = await get(url, params);
  return result.data;
}

// 收藏／取消收藏
export async function setHotelLike(params) {
  const url = `/api/collect/setCollect`;
  const result = await post(url, params);
  return result;
}

// 收藏／取消收藏 详情
export async function getHotelLike(params) {
  const url = `/api/collect/detail`;
  const result = await get(url, params);
  return result.data;
}

// 获取收藏列表
export async function getLikeList(params) {
  const url = `/api/collect/list`;
  const result = await get(url, params);
  return result.data;
}
