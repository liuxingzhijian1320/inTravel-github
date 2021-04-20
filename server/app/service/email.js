const Service = require('egg').Service;
const { randomPassSix } = require('../../utils');

class EmailService extends Service {
  // 发送邮件
  async send(params) {
    // 1. 先生成验证码
    const code = randomPassSix();

    // 2. 开始发送验证码
    const subject = '《自游》找回密码操作';
    const text = '您当前的执行的操作为找回密码，验证码不要轻易外泄';
    const html = `<h2>当前验证码为：${code}</a>`;

    const has_send = await this.service.tool.sendMail(
      params.email,
      subject,
      text,
      html
    );
    console.log(has_send ? '邮件发送成功' : '邮件发送失败');

    if (has_send) {
      // 3. 写入数据库
      await this.app.mysql.insert('email_code', { ...params, code });
    }

    return { has_send, code };
  }
  async query(email) {
    return await this.app.mysql.select('email_code', {
      where: { email, code_type: 1 },
      orders: [['create_time', 'desc']],
      limit: 1,
    });
  }

  async updateEmailStatus(id) {
    return await this.app.mysql.update('email_code', { id, code_type: 0 });
  }

  async queryList({ pageIndex = 1, pageSize = 12, email = '' }) {
    const table_name = 'email_code';
    const limit = `${(pageIndex - 1) * pageSize},${pageSize}`;
    let str = '';
    if (email) {
      str += ` and email like '${email}'`;
    }

    const query_str = '*';
    let sql = `select ${query_str} from ${table_name} where 1=1 ${str} order by create_time desc limit ${limit}`;
    let totalsql = `select count(*) from ${table_name}`;

    const list = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query(totalsql);

    return { list, total: total[0]['count(*)'], pageSize, pageIndex };
  }
}

module.exports = EmailService;
