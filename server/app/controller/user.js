'use strict';

const Controller = require('egg').Controller;
const { cb } = require('../../utils');

class UserController extends Controller {
  // 注册
  async createUser() {
    const { ctx, service } = this;
    const createRule = {
      nickname: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    };

    try {
      // 1. 校验参数
      ctx.validate(createRule);
      const params = ctx.request.body;
      // 2. 查重复
      const { id = 0 } = await service.user.queryByEmail(params.email);
      if (id) {
        cb(ctx, 200, 201, '当前邮箱已被注册', {});
        return;
      }
      await service.user.add(params);
      cb(ctx, 200, 200, '注册成功', {});
    } catch (err) {
      // ctx.logger.warn(err.errors);
      cb(ctx, 200, 422, '参数异常', err);
    }
  }

  // 登录
  async loginUser() {
    const { ctx, service, app } = this;
    try {
      const params = ctx.request.body;
      const {
        id = 0,
        password,
        nickname,
        email,
      } = await service.user.queryByEmail(params.email);

      if (!id) {
        cb(ctx, 200, 201, '登录邮箱不存在', {});
        return;
      }

      if (params.password != password) {
        cb(ctx, 200, 201, '密码不正确', {});
        return;
      }

      //签发 token 数据
      const token = app.jwt.sign(
        {
          username: nickname,
          userId: id,
          // exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1h
        },
        app.config.jwt.secret
      );

      cb(ctx, 200, 200, '登录成功', {
        token,
        nickname,
        userId: id,
        email,
      });
    } catch (err) {
      cb(ctx, 200, 422, '登录失败', err);
    }
  }

  // admin 系统 登录
  async loginAdminUser() {
    const { ctx, service, app } = this;
    try {
      const params = ctx.request.body;

      const {
        id = 0,
        password,
        nickname,
        email,
        admin,
      } = await service.user.queryByEmail(params.email);

      if (!id) {
        cb(ctx, 200, 201, '登录邮箱不存在', {});
        return;
      }

      if (params.password != password) {
        cb(ctx, 200, 201, '密码不正确', {});
        return;
      }

      if (!admin) {
        cb(ctx, 200, 201, '登录账号权限等级不足，请联系管理员', {});
        return;
      }

      //签发 token 数据
      const token = app.jwt.sign(
        {
          username: nickname,
          userId: id,
          // exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1h
        },
        app.config.jwt.secret
      );

      cb(ctx, 200, 200, '登录成功', {
        token,
        nickname,
        userId: id,
        email,
      });
    } catch (err) {
      cb(ctx, 200, 422, '登录失败', err);
    }
  }

  // 列表
  async listUser() {
    const { ctx, service } = this;
    try {
      const params = ctx.request.query;
      const list = await service.user.queryList(params);
      cb(ctx, 200, 200, '查询用户成功', list);
    } catch (err) {
      cb(ctx, 200, 422, '查询失败', err);
    }
  }

  // 详情
  async detailUser() {
    const { ctx, service } = this;
    try {
      const id = ctx.request.query.id;
      const detail = await service.user.query(id);
      cb(ctx, 200, 200, '查询用户详情成功', detail);
    } catch (err) {
      cb(ctx, 200, 422, '查询失败', err);
    }
  }

  // 删除
  async delUser() {
    const { ctx, service } = this;
    try {
      const { id = 0 } = ctx.request.body;
      const data = await service.user.query(id);
      if (!data) {
        cb(ctx, 200, 201, '当前用户不存在', {});
        return;
      }
      await service.user.del(id);
      cb(ctx, 200, 200, '删除成功', {});
    } catch (err) {
      cb(ctx, 200, 422, '删除失败', err);
    }
  }

  // 编辑
  async updateUser() {
    const { ctx, service } = this;
    try {
      const createRule = {
        nickname: { type: 'string' },
        email: { type: 'string' },
      };
      ctx.validate(createRule);

      const data = await service.user.query(ctx.request.body.id);
      if (!data) {
        cb(ctx, 200, 201, '当前用户不存在', {});
        return;
      }

      // 当前操作禁止用户修改密码，修改排除password参数
      const {
        id,
        nickname,
        email,
        phone,
        born,
        city,
        status,
      } = ctx.request.body;
      await service.user.update({
        id,
        nickname,
        email,
        phone,
        born,
        city,
        status,
      });
      cb(ctx, 200, 200, '编辑成功', {});
    } catch (err) {
      cb(ctx, 200, 422, '编辑失败', err);
    }
  }

  // 修改密码
  async updateUserPassword() {
    const { ctx, service } = this;
    try {
      const { id, password, newPassword } = ctx.request.body;

      const data = await service.user.queryPass(id);

      if (!data) {
        cb(ctx, 200, 201, '当前用户不存在', {});
        return;
      }

      if (password != data.password) {
        cb(ctx, 200, 201, '原始密码不正确', {});
      } else if (password === newPassword) {
        cb(ctx, 200, 201, '新老密码不能一样', {});
      } else {
        await service.user.update({ id, password: newPassword });
        cb(ctx, 200, 200, '修改密码成功', {});
      }
    } catch (err) {
      cb(ctx, 200, 422, '修改密码失败', err);
    }
  }

  // 重置密码
  async resetUserPassword() {
    const { ctx, service } = this;
    try {
      const { code, password, email } = ctx.request.body;
      // 1. 先验证 验证码 正确性
      const data = await service.email.query(email);
      // 1.1 验证码 不存在
      if (data.length === 0) {
        cb(ctx, 200, 201, '验证码不存在', {});
      } else {
        // 1.2 验证码不正确
        if (data[0].code != code) {
          cb(ctx, 200, 201, '验证码不正确', {});
          return;
        }
        //2. 验证码时效性：10分钟
        if (+new Date() - +new Date(data[0].create_time) > 1000 * 60 * 10) {
          cb(ctx, 200, 201, '验证码已失效', {});
          return;
        }
        // 3. 查询用户信息
        const { id = 0 } = await service.user.queryByEmail(email);
        // 4. 更改密码
        if (!id) {
          cb(ctx, 200, 201, '当前用户不存在', {});
          return;
        }
        await service.user.update({ id, password });
        // 更改验证码状态
        await service.email.updateEmailStatus(data[0].id);
        cb(ctx, 200, 200, '重置密码成功', {});
      }
    } catch (err) {
      cb(ctx, 200, 422, '重置密码失败', err);
    }
  }

  // 重置密码(管理端)
  async resetUserPasswordByAdmin() {
    const { ctx, service } = this;
    try {
      const { email } = ctx.request.body;
      // 1. 查询用户信息
      const { id = 0 } = await service.user.queryByEmail(email);

      // 2. 更改密码
      if (!id) {
        cb(ctx, 200, 201, '当前用户不存在', {});
        return;
      }
      // 初始密码为0000 md5('0000') = 4a7d1ed414474e4033ac29ccb8653d9b
      await service.user.update({
        id,
        email,
        password: '4a7d1ed414474e4033ac29ccb8653d9b',
      });
      cb(ctx, 200, 200, '重置密码成功', {});
    } catch (err) {
      cb(ctx, 200, 422, '重置密码失败', err);
    }
  }

  // 升级管理员
  async upgradeUserAdmin() {
    const { ctx, service } = this;
    try {
      const { id, admin_id } = ctx.request.body;

      const data = await service.user.query(admin_id);

      if (!data) {
        cb(ctx, 200, 201, '当前用户不存在', {});
        return;
      }
      // 999 = root, 1 = admin, 0 = visitor
      const { admin } = data;
      if (admin === 0) {
        cb(ctx, 200, 201, '资格不够', {});
      } else if (admin === 1) {
        cb(ctx, 200, 201, '请联系超级管理员升级', {});
      } else {
        await service.user.update({ id, admin: 1 });
        cb(ctx, 200, 200, '升级管理员成功', {});
      }
    } catch (err) {
      cb(ctx, 200, 422, '操作失败', err);
    }
  }

  // 降级为游客
  async downGradeUserAdmin() {
    const { ctx, service } = this;
    try {
      const { id, admin_id } = ctx.request.body;

      const data = await service.user.query(admin_id);

      if (!data) {
        cb(ctx, 200, 201, '当前用户不存在', {});
        return;
      }
      // 999 = root, 1 = admin, 0 = visitor
      const { admin } = data;
      if (admin === 0) {
        cb(ctx, 200, 201, '资格不够', {});
      } else if (admin === 1) {
        cb(ctx, 200, 201, '请联系超级管理员升级', {});
      } else {
        await service.user.update({ id, admin: 0 });
        cb(ctx, 200, 200, '降级为游客成功', {});
      }
    } catch (err) {
      cb(ctx, 200, 422, '操作失败', err);
    }
  }
}

module.exports = UserController;
