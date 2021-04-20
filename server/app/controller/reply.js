'use strict';

const Controller = require('egg').Controller;
const { cb } = require('../../utils');

class ReplyController extends Controller {
  // 创建
  async createReply() {
    const { ctx, service } = this;
    const createRule = {
      content: { type: 'string' },
      comment_id: { type: 'number' },
      to_id: { type: 'number' },
      from_id: { type: 'number' },
    };

    try {
      // 1. 校验参数
      ctx.validate(createRule);
      const params = ctx.request.body;
      // 敏感词过滤
      params.content = this.ctx.app.fullSensitivewords.replaceDfa(
        params.content,
        '***',
        true
      );
      await service.reply.add(params);
      cb(ctx, 200, 200, '新增回复成功', {});
    } catch (err) {
      cb(ctx, 200, 422, '参数异常', err);
    }
  }

  // 详情
  async detailComment() {
    const { ctx, service } = this;
    try {
      const id = ctx.request.query.id;
      const detail = await service.comment.query(id);
      cb(ctx, 200, 200, '查询成功', detail);
    } catch (err) {
      cb(ctx, 200, 422, '查询失败', err);
    }
  }

  // 列表
  async listComment() {
    const { ctx, service } = this;
    try {
      const params = ctx.request.query;
      const list = await service.comment.queryList(params);
      cb(ctx, 200, 200, '查询成功', list);
    } catch (err) {
      cb(ctx, 200, 422, '查询失败', err);
    }
  }

  // 删除
  async delComment() {
    const { ctx, service } = this;
    try {
      const { id = 0 } = ctx.request.body;
      const data = await service.comment.query(id);
      if (!data) {
        cb(ctx, 200, 422, '当前回复不存在', {});
        return;
      }
      await service.comment.del(id);
      cb(ctx, 200, 200, '删除成功', {});
    } catch (err) {
      cb(ctx, 200, 422, '删除失败', err);
    }
  }

  // 编辑
  async updateComment() {
    const { ctx, service } = this;
    try {
      const createRule = {
        content: { type: 'string' },
      };
      ctx.validate(createRule);
      const params = ctx.request.body;
      const data = await service.comment.query(params.id);
      if (!data) {
        cb(ctx, 200, 422, '当前回复不存在', {});
        return;
      }
      // 敏感词过滤
      params.content = this.ctx.app.fullSensitivewords.replaceDfa(
        params.content,
        '***',
        true
      );
      await service.comment.update(params);
      cb(ctx, 200, 200, '编辑成功', {});
    } catch (err) {
      cb(ctx, 200, 422, '编辑失败', err);
    }
  }
}

module.exports = ReplyController;
