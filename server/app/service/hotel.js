const Service = require('egg').Service;

class HotelService extends Service {
  async add(params) {
    return await this.app.mysql.insert('hotel', params);
  }

  async del(id) {
    return await this.app.mysql.delete('hotel', { id });
  }

  async update(params) {
    return await this.app.mysql.update('hotel', params);
  }

  async query(id) {
    return await this.app.mysql.get('hotel', { id });
  }

  async upOrDown(params) {
    return await this.app.mysql.update('hotel', params);
  }

  async queryList({
    pageIndex = 1,
    pageSize = 12,
    title = '',
    type = '',
    status = '',
  }) {
    const table_name = 'hotel';
    const limit = `${(pageIndex - 1) * pageSize},${pageSize}`;
    let str = '';
    if (title) {
      str += ` and title like '%${title}%'`;
    }

    if (type) {
      // hot lower
      str += ` and type like '${type}'`;
    }

    if (!(status === '')) {
      // 0 下架 1 上架
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

module.exports = HotelService;
