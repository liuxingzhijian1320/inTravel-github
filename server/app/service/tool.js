// 封装好 发送邮件
// app/service/tool.js

'use strict';

const Service = require('egg').Service;
const nodemailer = require('nodemailer');
const user_email = '1145389590@qq.com';

const transporter = nodemailer.createTransport({
  service: 'qq',
  secure: false,
  // secureConnection: true, // 使用 SSL
  port: 587,
  auth: {
    user: user_email,
    //这里密码不是qq密码，是你设置的smtp密码
    pass: '获取你的密码',
  },
});

class ToolService extends Service {
  // 发送邮件
  async sendMail(email, subject, text, html) {
    // console.log('sendMail', email, subject, text, html);
    const mailOptions = {
      from: user_email, // 发送者,与上面的user一致
      to: email, // 接收者,可以同时发送多个,以逗号隔开
      subject, // 标题
      text, // 文本
      html,
    };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = ToolService;
