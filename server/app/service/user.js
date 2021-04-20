const Service = require('egg').Service;

class UserService extends Service {
  async add(params) {
    return await this.app.mysql.insert('user', params);
  }

  async del(id) {
    return await this.app.mysql.delete('user', { id });
  }

  async update(params) {
    return await this.app.mysql.update('user', params);
  }

  async query(id) {
    const sql = `select id, nickname, email, born, phone, status, city from user where id = ${id} limit 1`;
    return (await this.app.mysql.query(sql))[0];
  }

  async queryPass(id) {
    const sql = `select id, password from user where id = ${id} limit 1`;
    return (await this.app.mysql.query(sql))[0];
  }

  async queryByEmail(email) {
    return (await this.app.mysql.get('user', { email })) || {};
  }
  async queryList({
    pageIndex = 1,
    pageSize = 12,
    email = '',
    nickname = '',
    status = '',
  }) {
    const table_name = 'user';
    const limit = `${(pageIndex - 1) * pageSize},${pageSize}`;
    let str = '';
    if (nickname) {
      str += ` and nickname like '%${nickname}%'`;
    }
    if (email) {
      str += ` and email like '%${email}%'`;
    }
    if (!(status === '')) {
      str += ` and status like '${status}'`;
    }
    const query_str =
      'id, nickname, email, phone, born, city, admin, status, create_time, update_time';
    let sql = `select ${query_str} from ${table_name} where 1=1 ${str} order by create_time desc limit ${limit}`;
    let totalsql = `select count(*) from ${table_name}`;

    const list = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query(totalsql);

    return { list, total: total[0]['count(*)'], pageSize, pageIndex };
  }
}

module.exports = UserService;
