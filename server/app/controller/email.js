'use strict';

const Controller = require('egg').Controller;
const { cb } = require('../../utils');

class EmailController extends Controller {
  // 发送验证码
  async emailSendCode() {
    const { ctx, service } = this;
    const createRule = {
      email: { type: 'string' },
    };
    try {
      //1. 校验参数
      ctx.validate(createRule);
      const params = ctx.request.body;
      //2. 验证邮箱是否注册
      const data = await service.user.queryByEmail(params.email);
      if (data && data.email) {
        // 3. 发送验证码
        let { has_send, code } = await service.email.send(params);
        if (has_send) {
          cb(ctx, 200, 200, '发送成功', { code });
        } else {
          cb(ctx, 200, 201, '发送失败', {});
        }
      } else {
        cb(ctx, 200, 201, '邮箱未注册', {});
      }
    } catch (err) {
      // ctx.logger.warn(err.errors);
      cb(ctx, 200, 422, '参数异常', err);
    }
  }

  // 列表
  async emailListCode() {
    const { ctx, service } = this;
    try {
      const params = ctx.request.query;
      const list = await service.email.queryList(params);
      cb(ctx, 200, 200, '查询成功', list);
    } catch (err) {
      cb(ctx, 200, 422, '查询失败', err);
    }
  }
}

module.exports = EmailController;
