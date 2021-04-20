'use strict';

const Controller = require('egg').Controller;
const { cb } = require('../../utils');

class OrdernoController extends Controller {
  // 创建
  async createOrder() {
    const { ctx, service } = this;
    const createRule = {
      hotel_id: { type: 'number' },
      user_id: { type: 'number' },
      room_id: { type: 'number' },
      people: { type: 'number' },
      rooms: { type: 'number' },
      start: { type: 'string' },
      end: { type: 'string' },
    };

    try {
      // 1. 校验参数
      ctx.validate(createRule);
      let params = ctx.request.body;
      // 计算订单编号
      let order_no = `${+new Date()}${params.user_id}${params.hotel_id}${
        params.room_id
      }${params.rooms}`;
      const { price } = await service.room.query(params.room_id);
      params = {
        ...params,
        price: price * params.rooms,
        status: 1,
        order_no,
      };
      const { insertId: order_id } = await service.orderno.add(params);
      cb(ctx, 200, 200, '新增成功', { order_id });
    } catch (err) {
      cb(ctx, 200, 422, '参数异常', err);
    }
  }

  // 列表
  async listOrder() {
    const { ctx, service } = this;
    try {
      const params = ctx.request.query;
      const detail = await service.orderno.queryList(params);

      for (let val of detail.list) {
        const h = await service.hotel.query(val.hotel_id);
        const u = await service.user.query(val.user_id);

        if (h && h.title && h.cover) {
          val.hotel = {
            title: h.title,
            cover: h.cover,
            grade: h.grade,
          };
        } else {
          val.hotel = {};
        }

        if (u && u.nickname && u.email) {
          val.user = {
            nickname: u.nickname,
            email: u.email,
          };
        } else {
          val.user = {};
        }
      }

      cb(ctx, 200, 200, '查询成功', detail);
    } catch (err) {
      cb(ctx, 200, 422, '查询失败', err);
    }
  }

  // 详情
  async detailOrder() {
    const { ctx, service } = this;
    try {
      const id = ctx.request.query.id;
      let detail = await service.orderno.query(id);
      if (detail) {
        const { title, cover } = await service.hotel.query(detail.hotel_id);
        const { nickname, email } = await service.user.query(detail.user_id);
        detail.hotel = {
          title,
          cover,
        };
        detail.user = {
          nickname,
          email,
        };
      }

      cb(ctx, 200, 200, '查询详情成功', detail);
    } catch (err) {
      cb(ctx, 200, 422, '查询详情失败', err);
    }
  }

  // 删除
  async delOrder() {
    const { ctx, service } = this;
    try {
      const { id = 0 } = ctx.request.body;
      const data = await service.orderno.query(id);
      if (!data) {
        cb(ctx, 200, 201, '当前订单不存在', {});
        return;
      }
      await service.orderno.del(id);
      cb(ctx, 200, 200, '删除成功', {});
    } catch (err) {
      cb(ctx, 200, 422, '删除失败', err);
    }
  }

  // 编辑
  async updateOrderStatus() {
    const { ctx, service } = this;
    try {
      const createRule = {
        id: { type: 'string' },
      };
      ctx.validate(createRule);
      const params = ctx.request.body;
      const data = await service.orderno.query(params.id);
      if (!data) {
        cb(ctx, 200, 201, '当前订单不存在', {});
        return;
      }

      await service.orderno.updateStatus(params);
      cb(ctx, 200, 200, '编辑成功', {});
    } catch (err) {
      cb(ctx, 200, 422, '编辑失败', err);
    }
  }

  // 编辑
  // async updateOrder() {
  //   const { ctx, service } = this;
  //   try {
  //     const createRule = {
  //       hotel_id: { type: 'number' },
  //       user_id: { type: 'number' },
  //       room_id: { type: 'number' },
  //       people: { type: 'number' },
  //       rooms: { type: 'number' },
  //       price: { type: 'number' },
  //       start: { type: 'string' },
  //       end: { type: 'string' },
  //     };
  //     ctx.validate(createRule);

  //     const params = ctx.request.body;
  //     const data = await service.order.query(params.id);
  //     if (!data) {
  //       cb(ctx, 200, 201, '当前订单不存在', {});
  //       return;
  //     }

  //     await service.order.update(params);
  //     cb(ctx, 200, 200, '编辑成功', {});
  //   } catch (err) {
  //     cb(ctx, 200, 422, '编辑失败', err);
  //   }
  // }
}

module.exports = OrdernoController;
