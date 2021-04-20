import { get, post } from '../api/request';

// 获取订单列表
export async function getOrderList(params) {
  const url = `/api/order/list`;
  const result = await get(url, params);
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

// 删除订单
export async function orderDelOne(params) {
  const url = `/api/order/del`;
  const result = await post(url, params);
  return result.data;
}
