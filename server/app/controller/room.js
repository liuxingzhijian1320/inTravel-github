'use strict';

const Controller = require('egg').Controller;
const { cb } = require('../../utils');

class RoomController extends Controller {
  // 创建
  async createRoom() {
    const { ctx, service } = this;
    const createRule = {
      title: { type: 'string' },
      hotel_id: { type: 'string' },
      cover: { type: 'string' },
      price: { type: 'string' },
      max: { type: 'string' },
    };

    try {
      // 1. 校验参数
      ctx.validate(createRule);
      const params = ctx.request.body;
      await service.room.add(params);
      cb(ctx, 200, 200, '新增成功', {});
    } catch (err) {
      cb(ctx, 200, 422, '参数异常', err);
    }
  }

  // 列表
  async listRoom() {
    const { ctx, service } = this;
    try {
      const params = ctx.request.query;
      const list = await service.room.queryList(params);
      cb(ctx, 200, 200, '查询成功', list);
    } catch (err) {
      cb(ctx, 200, 422, '查询失败', err);
    }
  }

  // 详情
  async detailRoom() {
    const { ctx, service } = this;
    try {
      const id = ctx.request.query.id;
      const detail = await service.room.query(id);
      cb(ctx, 200, 200, '查询详情成功', detail);
    } catch (err) {
      cb(ctx, 200, 422, '查询详情失败', err);
    }
  }

  // 删除
  async delRoom() {
    const { ctx, service } = this;
    try {
      const { id = 0 } = ctx.request.body;
      const data = await service.room.query(id);
      if (!data) {
        cb(ctx, 200, 201, '当前房间不存在', {});
        return;
      }
      await service.room.del(id);
      cb(ctx, 200, 200, '删除成功', {});
    } catch (err) {
      cb(ctx, 200, 422, '删除失败', err);
    }
  }

  // 编辑
  async updateRoom() {
    const { ctx, service } = this;
    try {
      const createRule = {
        hotel_id: { type: 'string' },
        title: { type: 'string' },
        cover: { type: 'string' },
        price: { type: 'number' },
        max: { type: 'number' },
      };
      ctx.validate(createRule);

      const params = ctx.request.body;
      const data = await service.room.query(params.id);
      if (!data) {
        cb(ctx, 200, 201, '当前房间不存在', {});
        return;
      }

      await service.room.update(params);
      cb(ctx, 200, 200, '编辑成功', {});
    } catch (err) {
      cb(ctx, 200, 422, '编辑失败', err);
    }
  }

  // 上架
  async upRoom() {
    const { ctx, service } = this;
    try {
      const { id } = ctx.request.body;

      const data = await service.room.query(id);
      if (!data) {
        cb(ctx, 200, 201, '当前房间不存在', {});
        return;
      }
      const { status } = data;
      if (status === 1) {
        cb(ctx, 200, 201, '当前房间已经上架了', {});
        return;
      } else {
        await service.room.upOrDown({ id, status: 1 });
        cb(ctx, 200, 200, '上架房间成功', {});
      }
    } catch (err) {
      cb(ctx, 200, 422, '编辑失败', err);
    }
  }

  // 下架
  async downRoom() {
    const { ctx, service } = this;
    try {
      const { id } = ctx.request.body;

      const data = await service.room.query(id);
      if (!data) {
        cb(ctx, 200, 201, '当前房间不存在', {});
        return;
      }
      const { status } = data;
      if (status === 0) {
        cb(ctx, 200, 201, '当前房间已经下架了', {});
        return;
      } else {
        await service.room.upOrDown({ id, status: 0 });
        cb(ctx, 200, 200, '下架房间成功', {});
      }
    } catch (err) {
      cb(ctx, 200, 422, '编辑失败', err);
    }
  }
}

module.exports = RoomController;
