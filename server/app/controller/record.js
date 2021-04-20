'use strict';

const Controller = require('egg').Controller;
const { cb } = require('../../utils');

class RecordController extends Controller {
  // 创建
  async createRecord() {
    const { ctx, service } = this;
    const createRule = {
      user_id: { type: 'number' },
      hotel_id: { type: 'string' },
    };
    try {
      // 1. 校验参数
      ctx.validate(createRule);
      const params = ctx.request.body;
      const { user_id } = params;
      const ids = params.hotel_id.split(',');
      for (let id of ids) {
        await service.record.add({ hotel_id: id, user_id });
      }

      cb(ctx, 200, 200, '新增记录成功', {});
    } catch (err) {
      console.log(13, err);
      cb(ctx, 200, 422, '参数异常', err);
    }
  }

  // 列表
  async listRecord() {
    const { ctx, service } = this;
    try {
      const params = ctx.request.query;
      const list = await service.record.queryList(params);
      for (let val of list) {
        val.hotel = await service.hotel.query(val.hotel_id);
      }
      cb(ctx, 200, 200, '查询成功', list);
    } catch (err) {
      cb(ctx, 200, 422, '查询失败', err);
    }
  }
}

module.exports = RecordController;
