const Service = require('egg').Service;

class CommentService extends Service {
  async add(params) {
    return await this.app.mysql.insert('comment', params);
  }

  async del(id) {
    return await this.app.mysql.delete('comment', { id });
  }

  async update(params) {
    return await this.app.mysql.update('comment', params);
  }

  async query(id) {
    let sql = `select * from comment where id = ${id}`;
    const detail = await this.app.mysql.query(sql);
    let userDetail = {};
    if (detail.length == 0) {
      return null;
    } else {
      let userSql = `select id, nickname, email from user where id = ${detail[0].user_id}`;
      userDetail = await this.app.mysql.query(userSql);
    }

    return {
      ...detail[0],
      userinfo: userDetail,
    };
  }

  async queryList({ pageIndex = 1, pageSize = 12, title = '', hotel_id }) {
    const table_name = 'comment';
    const limit = `${(pageIndex - 1) * pageSize},${pageSize}`;
    let str = '';
    if (title) {
      str += ` and title like '%${title}%'`;
    }

    if (hotel_id) {
      str += ` and hotel_id like '%${hotel_id}%'`;
    }

    const query_str = '*';
    let sql = `select ${query_str} from ${table_name} where 1=1 ${str} order by create_time desc limit ${limit}`;
    let totalsql = `select count(*) from ${table_name}`;
    const hotelSql = `select id, grade from hotel where 1=1 and`;
    const userSql = `select id, nickname from user where 1=1 and`;
    const replySql = `select id, content, to_id, from_id, create_time from reply where 1=1 and`;

    const list = await this.app.mysql.query(sql);

    for (let val of list) {
      // 关联酒店信息
      val.hotel = (
        await this.app.mysql.query(`${hotelSql} id=${val.hotel_id}`)
      )[0];
      // 关联用户信息
      val.user = (
        await this.app.mysql.query(`${userSql} id=${val.user_id}`)
      )[0];

      val.replyList = await this.app.mysql.query(
        `${replySql} comment_id = ${val.id}`
      );
      if (val.replyList.length > 0) {
        for (let v of val.replyList) {
          // 关联用户信息
          v.from_user = (
            await this.app.mysql.query(`${userSql} id=${v.from_id}`)
          )[0];
          // 关联用户信息
          v.to_user = (
            await this.app.mysql.query(`${userSql} id=${v.to_id}`)
          )[0];
        }
      }
    }

    // 获取 总数据
    const total = await this.app.mysql.query(totalsql);

    return { list, total: total[0]['count(*)'], pageSize, pageIndex };
  }
}

module.exports = CommentService;
