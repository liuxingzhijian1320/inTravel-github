'use strict';

const Controller = require('egg').Controller;
const { cb } = require('../../utils');

class CollectController extends Controller {
  // 收藏 ／ 取消收藏
  async setCollect() {
    const { ctx, service } = this;
    try {
      const createRule = {
        user_id: { type: 'number' },
        hotel_id: { type: 'number' },
        collect: { type: 'number' },
      };
      ctx.validate(createRule);

      const { hotel_id, user_id, collect } = ctx.request.body;

      const data = await service.hotel.query(hotel_id);
      if (!data) {
        cb(ctx, 200, 201, '当前酒店不存在', {});
        return;
      }

      const data2 = await service.user.query(user_id);
      if (!data2) {
        cb(ctx, 200, 201, '当前用户不存在', {});
        return;
      }

      await service.collect.create({ hotel_id, user_id, collect });

      if (collect) {
        cb(ctx, 200, 200, '收藏成功', {});
      } else {
        cb(ctx, 200, 200, '取消收藏成功', {});
      }
    } catch (err) {
      cb(ctx, 200, 422, '操作失败', err);
    }
  }

  // 详情
  async detailCollect() {
    const { ctx, service } = this;
    try {
      const params = ctx.request.query;
      const list = await service.collect.query(params);
      cb(ctx, 200, 200, '查询成功', list);
    } catch (err) {
      cb(ctx, 200, 422, '查询失败', err);
    }
  }

  // 列表
  async listCollect() {
    const { ctx, service } = this;
    try {
      const params = ctx.request.query;
      const list = await service.collect.queryList(params);
      for (let val of list) {
        val.hotel = await service.hotel.query(val.hotel_id);
      }
      cb(ctx, 200, 200, '查询成功', list);
    } catch (err) {
      cb(ctx, 200, 422, '查询失败', err);
    }
  }
}

module.exports = CollectController;
