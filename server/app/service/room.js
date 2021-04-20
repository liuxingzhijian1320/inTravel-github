const Service = require('egg').Service;

class RoomService extends Service {
  async add(params) {
    return await this.app.mysql.insert('room', params);
  }

  async del(id) {
    return await this.app.mysql.delete('room', { id });
  }

  async update(params) {
    return await this.app.mysql.update('room', params);
  }

  async upOrDown(params) {
    return await this.app.mysql.update('room', params);
  }

  async query(id) {
    return await this.app.mysql.get('room', { id });
  }

  async queryList({
    pageIndex = 1,
    pageSize = 12,
    title = '',
    type = '',
    status = '',
    hotel_id = 0,
  }) {
    const table_name = 'room';
    const limit = `${(pageIndex - 1) * pageSize},${pageSize}`;
    let str = `and hotel_id = ${hotel_id} `;
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

module.exports = RoomService;
