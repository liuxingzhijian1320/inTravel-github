const Service = require('egg').Service;

class CollectService extends Service {
  async create({ hotel_id, user_id, collect }) {
    // 添加数据，重复的覆盖（id保持不变），新的则新增
    let sql = `INSERT INTO collect(hotel_id, user_id, create_time, update_time, collect) VALUE(${hotel_id}, ${user_id}, now(), now(), ${collect}) ON DUPLICATE KEY UPDATE create_time= now(), update_time= now(), collect = ${collect}`;
    return await this.app.mysql.query(sql);
  }

  async query({ hotel_id, user_id }) {
    return await this.app.mysql.get('collect', { hotel_id, user_id });
  }

  async queryList({ user_id }) {
    let sql = `select * from collect where user_id = ${user_id} and collect = 1`;
    return await this.app.mysql.query(sql);
  }
}

module.exports = CollectService;
