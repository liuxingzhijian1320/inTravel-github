const Service = require('egg').Service;

class RecordService extends Service {
  async add({ hotel_id, user_id }) {
    // 添加数据，重复的覆盖（id保持不变），新的则新增
    let sql = `INSERT INTO record(hotel_id,user_id, create_time, update_time) VALUE(${hotel_id},${user_id}, now(), now()) ON DUPLICATE KEY UPDATE create_time= now() ,update_time= now()`;
    return await this.app.mysql.query(sql);
  }

  async query(id) {
    return await this.app.mysql.get('record', { id });
  }

  async queryList({ user_id }) {
    let sql = `select * from record where user_id = ${user_id} limit 6`;
    const list = await this.app.mysql.query(sql);

    return list;
  }
}

module.exports = RecordService;
