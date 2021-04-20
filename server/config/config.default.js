/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1616162730956_7491';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // server config
  config.cluster = {
    listen: {
      // path: '',
      port: 1155,
      hostname: 'localhost',
    },
  };

  // 上传文件
  config.multipart = {
    mode: 'file', // 上传文件模式stream/file
    fileSize: '10mb', // fileSize默认是10mb。如果上传大文件，应指定此配置
    // whitelist: ['.png, .jpg, .gif', 'jpeg'], // 会覆盖默认文件白名单，仅允许.png格式文件
    // fileExtensions: ['.xlsx'], // 定制其他文件拓展名
  };

  // 静态资源
  config.static = {
    maxAge: 31536000,
    prefix: '/public/',
  };

  // mysql的数据配置
  config.mysql = {
    //database configuration
    client: {
      //host
      host: 'localhost',
      //port
      port: '3306',
      //username
      user: 'root',
      //password
      password: '你的数据库密码',
      //database
      database: '你的数据库名称', //
    },
    //load into app,default is open //加载到应用程序，默认为打开
    app: true,
    //load into agent,default is close //加载到代理中，默认值为“关闭”
    agent: false,
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['http://localhost:1155'], //允许访问接口的白名单
  };

  config.jwt = {
    secret: '你的自定义秘钥', //自定义 token 的加密条件字符串
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  return {
    ...config,
    ...userConfig,
  };
};
