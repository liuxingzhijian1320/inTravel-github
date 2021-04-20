import { get, post } from "../api/request";

// 创建订单
export async function createOrder(params) {
  const url = `/api/order/create`;
  const result = await post(url, params);
  return result.data;
}

// 获取订单详情
export async function getOrderDetail(params) {
  const url = `/api/order/detail`;
  const result = await get(url, params);
  return result.data;
}

// 更新订单状态
export async function updateOrderStatus(params) {
  const url = `/api/order/status`;
  const result = await post(url, params);
  return result.data;
}

// 获取订单列表
export async function getOrderList(params) {
  const url = `/api/order/list`;
  const result = await get(url, params);
  return result.data;
}
