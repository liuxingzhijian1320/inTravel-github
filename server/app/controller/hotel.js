'use strict';

const Controller = require('egg').Controller;
const { cb } = require('../../utils');

class HotelController extends Controller {
  // 注册 创建
  async createHotel() {
    const { ctx, service } = this;
    const createRule = {
      title: { type: 'string' },
      cover: { type: 'string' },
      desc: { type: 'string' },
      address: { type: 'string' },
      lat: { type: 'string' },
      lng: { type: 'string' },
      province: { type: 'string' },
      city: { type: 'string' },
      district: { type: 'string' },
      provinceCode: { type: 'string' },
      cityCode: { type: 'string' },
      districtCode: { type: 'string' },
    };

    try {
      // 1. 校验参数
      ctx.validate(createRule);
      const params = ctx.request.body;
      await service.hotel.add(params);
      cb(ctx, 200, 200, '新增酒店成功', {});
    } catch (err) {
      cb(ctx, 200, 422, '参数异常', err);
    }
  }

  // 列表
  async listHotel() {
    const { ctx, service } = this;
    try {
      const params = ctx.request.query;
      const list = await service.hotel.queryList(params);
      cb(ctx, 200, 200, '查询酒店成功', list);
    } catch (err) {
      cb(ctx, 200, 422, '查询酒店失败', err);
    }
  }

  // 详情
  async detailHotel() {
    const { ctx, service } = this;
    try {
      const id = ctx.request.query.id;
      const detail = await service.hotel.query(id);
      cb(ctx, 200, 200, '查询酒店详情成功', detail);
    } catch (err) {
      cb(ctx, 200, 422, '查询酒店详情失败', err);
    }
  }

  // 删除酒店
  async delHotel() {
    const { ctx, service } = this;
    try {
      const { id = 0 } = ctx.request.body;
      const data = await service.hotel.query(id);
      if (!data) {
        cb(ctx, 200, 201, '当前酒店不存在', {});
        return;
      }
      await service.hotel.del(id);
      cb(ctx, 200, 200, '删除成功', {});
    } catch (err) {
      cb(ctx, 200, 422, '删除失败', err);
    }
  }

  // 编辑酒店
  async updateHotel() {
    const { ctx, service } = this;
    try {
      const createRule = {
        title: { type: 'string' },
        desc: { type: 'string' },
        address: { type: 'string' },
        lat: { type: 'string' },
        lng: { type: 'string' },
        cover: { type: 'string' },
        province: { type: 'string' },
        city: { type: 'string' },
        district: { type: 'string' },
        provinceCode: { type: 'string' },
        cityCode: { type: 'string' },
        districtCode: { type: 'string' },
      };
      ctx.validate(createRule);

      const params = ctx.request.body;
      const data = await service.hotel.query(params.id);
      if (!data) {
        cb(ctx, 200, 201, '当前酒店不存在', {});
        return;
      }

      await service.hotel.update(params);
      cb(ctx, 200, 200, '编辑成功', {});
    } catch (err) {
      cb(ctx, 200, 422, '编辑失败', err);
    }
  }

  // 上架 酒店
  async upHotel() {
    const { ctx, service } = this;
    try {
      const { id } = ctx.request.body;

      const data = await service.hotel.query(id);
      if (!data) {
        cb(ctx, 200, 201, '当前酒店不存在', {});
        return;
      }
      const { status } = data;
      if (status === 1) {
        cb(ctx, 200, 201, '当前酒店已经上架了', {});
        return;
      } else {
        await service.hotel.upOrDown({ id, status: 1 });
        cb(ctx, 200, 200, '上架酒店成功', {});
      }
    } catch (err) {
      cb(ctx, 200, 422, '编辑失败', err);
    }
  }

  // 下架 酒店
  async downHotel() {
    const { ctx, service } = this;
    try {
      const { id } = ctx.request.body;

      const data = await service.hotel.query(id);
      if (!data) {
        cb(ctx, 200, 201, '当前酒店不存在', {});
        return;
      }
      const { status } = data;
      if (status === 0) {
        cb(ctx, 200, 201, '当前酒店已经下架了', {});
        return;
      } else {
        await service.hotel.upOrDown({ id, status: 0 });
        cb(ctx, 200, 200, '下架酒店成功', {});
      }
    } catch (err) {
      cb(ctx, 200, 422, '编辑失败', err);
    }
  }
}

module.exports = HotelController;
