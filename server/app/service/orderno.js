const Service = require('egg').Service;

class OrdernoService extends Service {
  async add(params) {
    return await this.app.mysql.insert('orderno', params);
  }

  async del(id) {
    return await this.app.mysql.delete('orderno', { id });
  }

  async update(params) {
    return await this.app.mysql.update('orderno', params);
  }

  async updateStatus({ id }) {
    return await this.app.mysql.update('orderno', { id, status: 2 });
  }

  async query(id) {
    return await this.app.mysql.get('orderno', { id });
  }

  async queryList({ pageIndex = 1, pageSize = 12, status = '', user_id = 0 }) {
    const table_name = 'orderno';
    const limit = `${(pageIndex - 1) * pageSize},${pageSize}`;
    let str = '';
    if (user_id) {
      str += ` and user_id = ${user_id}`;
    }

    if (!(status === '')) {
      str += ` and status like '${status}'`;
    }

    const query_str = '*';
    let sql = `select ${query_str} from ${table_name} where 1=1 ${str} order by create_time desc limit ${limit}`;
    let totalsql = `select count(*) from ${table_name}`;

    const list = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query(totalsql);

    return { list, total: total[0]['count(*)'], pageSize, pageIndex };
  }
}

module.exports = OrdernoService;
