import { get, post } from '../api/request';

// 酒店列表
export async function getHotelList(params) {
  const url = `/api/hotel/list`;
  const result = await get(url, params);
  return result.data;
}

// 删除酒店
export async function delHotelOne(params) {
  const url = `/api/hotel/del`;
  const result = await post(url, params);
  return result.data;
}

// 酒店详情
export async function getHotelDetail(params) {
  const url = `/api/hotel/detail`;
  const result = await get(url, params);
  return result.data;
}

// 编辑酒店
export async function postHotelDetail(params) {
  const url = `/api/hotel/update`;
  const result = await post(url, params);
  return result.data;
}

// 新增酒店
export async function addHotelDetail(params) {
  const url = `/api/hotel/create`;
  const result = await post(url, params);
  return result.data;
}

// 上架酒店
export async function upHotel(params) {
  const url = `/api/hotel/up`;
  const result = await post(url, params);
  return result;
}

// 下架酒店
export async function downHotel(params) {
  const url = `/api/hotel/down`;
  const result = await post(url, params);
  return result;
}

// 房间列表
export async function getRoomList(params) {
  const url = `/api/room/list`;
  const result = await get(url, params);
  return result.data;
}
// 房间详情
export async function roomDetail(params) {
  const url = `/api/room/detail`;
  const result = await get(url, params);
  return result.data;
}
// 房间新增
export async function addRoom(params) {
  const url = `/api/room/create`;
  const result = await post(url, params);
  return result;
}
// 房间编辑
export async function updateRoom(params) {
  const url = `/api/room/update`;
  const result = await post(url, params);
  return result;
}
// 房间删除
export async function delRoom(params) {
  const url = `/api/room/del`;
  const result = await post(url, params);
  return result;
}
// 上架房间
export async function upRoom(params) {
  const url = `/api/room/up`;
  const result = await post(url, params);
  return result;
}
// 下架房间
export async function downRoom(params) {
  const url = `/api/room/down`;
  const result = await post(url, params);
  return result;
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
