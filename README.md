## 本项目为个人开源项目，名为《自游》，是一款全栈项目

## 设计的技术栈

1. vue3
2. react17
3. egg
4. mysql
5. pm2+nginx
6. node 12+
7. nuxt（正在开发中）

### 预览图

![](http://api.sanzhikaola.com/public/images/hotel/2021-04-20-14-43-28-819.png)

### 配置数据库

- 先创建一个数据库 database， 假设我们数据库名称为 demosql（格式为： utf8mb4 utf8mb4_0900_ai_ci）

- 导入数据库文件(data.sql)

- 常见错误
  如果你的新创建的 database 不是 utf8mb4 utf8mb4_0900_ai_ci 这个格式，请修改 data.sql 里面的这个格式，在重新导入

### server 端

- init 创建项目 见[文档](https://eggjs.org/zh-cn/intro/quickstart.html)

- 配置对应的参数

  1. config/config.default.js 数据库的名称 账号 密码， jwt 秘钥
  2. app/service/tool.js 更改的发邮件密码

- 本地开发

```
  npm run dev
```

如果你的姿势都 ok，egg 运行项目就 ok 了

- 创建 root 账户(password: md5(123))

```
INSERT INTO `demosql`.`user`(`nickname`, `password`, `email`, `admin`) VALUES ( '10个肉包子', '202cb962ac59075b964b07152d234b70','123@qq.com', 999)
```

### admin 系统

- init 创建项目 见[文档](https://react.docschina.org/docs/create-a-new-react-app.html)

- 本地开发

```
  npm run dev
```

- 登录 用新创建的账号密码

登录及其内部操作截图
![](http://api.sanzhikaola.com/public/images/hotel/2021-04-20-15-21-15-195.png)  
![](http://api.sanzhikaola.com/public/images/hotel/2021-04-20-15-19-05-165.png)  
![](http://api.sanzhikaola.com/public/images/hotel/2021-04-20-15-19-25-992.png)  
![](http://api.sanzhikaola.com/public/images/hotel/2021-04-20-15-19-35-430.png)  
![](http://api.sanzhikaola.com/public/images/hotel/2021-04-20-15-19-47-112.png)  
![](http://api.sanzhikaola.com/public/images/hotel/2021-04-20-15-19-58-197.png)  
![](http://api.sanzhikaola.com/public/images/hotel/2021-04-20-15-20-07-906.png)

- 功能

  1. -[x] 用户登录
  2. -[x] 用户删除
  3. -[x] 用户启用／禁用
  4. -[x] 用户查询 编辑用户信息
  5. -[x] 用户重置密码

  6. -[x] 酒店 CURD
  7. -[x] 酒店 上下架
  8. -[x] 房间 CURD
  9. -[x] 评论

  10. -[x] 订单查询
  11. -[x] 验证码查询

### h5 端

- init 创建项目 见[文档](https://www.vue3js.cn/docs/zh/guide/installation.html)

- 本地开发

```
  npm run dev
```

- 功能

  1. -[x] 用户登录
  2. -[x] 用户注册
  3. -[x] 用户找回密码
  4. -[x] 用户修改密码
  5. -[x] 用户邮件验证码
  6. -[x] 用户查询 编辑用户信息
  7. -[x] 用户重置密码
  8. -[x] 酒店列表
  9. -[x] 下单
  10. -[x] 收藏
  11. -[x] 换肤

- 项目访问地址

  [demo](http://h.sanzhikaola.com)

### pc 端 （ 正在开发中，nuxt 的代码暂不开放，最近事情比较多， 后期闲下来吧 code 一并提交 github）

- init 创建项目 见[文档](https://zh.nuxtjs.org/docs/2.x/get-started/installation)

- 本地开发

```
  npm run dev
```

- 功能

  1. -[x] 酒店列表
  2. -[ ] 用户注册
  3. -[ ] 用户找回密码
  4. -[ ] 用户修改密码
  5. -[ ] 用户邮件验证码
  6. -[ ] 用户查询 编辑用户信息
  7. -[ ] 用户重置密码
  8. -[ ] 下单
  9. -[ ] 收藏

- 项目访问地址

  [demo](http://www.sanzhikaola.com)

## 发布流程

> 别傻，node_moudles 不要上传～～～～

### server 端

1. 把 server 的所有的代码放到您的 centos 或者其他服务器指定目录

2. 创建这个文件 inTravel-server-1155.js ，添加如下代码

```
  const egg = require('egg');

  const workers = Number(process.argv[2] || require('os').cpus().length);
  egg.startCluster({
    workers,
    baseDir: __dirname,
  });

```

3. 运行代码 `pm2 start inTravel-server-1155.js`

4. 配置对应域名的解析操作

5. nginx.config 配置

```
      #自游 - server
      upstream inTravelServer {
        server 127.0.0.1:1155;
      }

       server {
        listen       80;
        server_name  xxx.xxx.com;

        location / {
          #设置主机头和客户端真实地址，以便服务器获取客户端真实IP
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          #禁用缓存
          proxy_buffering off;

          #反向代理的地址
          proxy_pass http://inTravelServer;

        }
    }

```

5. 重启 nginx sbin

### h5 端

1. `npm run buid` 把 dist/ 放到您的 centos 或者其他服务器指定目录

2. `npm init -y && npm i express`

3. 创建这个文件 inTravel-h5-1144.js ，添加如下代码

```
  //引入express中间件
  var express = require("express");
  var app = express();

  //指定启动服务器到哪个文件夹，我这边指的是dist文件夹
  app.use(express.static("./"));

  // 监听端口为1111
  var server = app.listen(1144, function() {
    console.info("复制打开浏览器");
  });
```

3. 运行代码 `pm2 start inTravel-h5-1144.js`

4. 配置对应域名的解析操作

5. nginx.config 配置

```
      #自游 - h5
      upstream inTravelH5 {
        server 127.0.0.1:1144;
      }

       server {
        listen       80;
        server_name  h.sanzhikaola.com;
        #charset koi8-r;

        #access_log  logs/host.access.lsog  main;

        location / {

          #设置主机头和客户端真实地址，以便服务器获取客户端真实IP
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          #禁用缓存
          proxy_buffering off;

          #反向代理的地址
          proxy_pass http://inTravelH5;

          root /workspace/inTravel/h5;
          index index.html index.htm;
          try_files $uri $uri/ /index.html;

        }


        location /api {
          proxy_pass http://inTravelServer;

        }


        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }


```

6. 重启 nginx sbin

### admin 端

1. `npm run buid` 把 build/ 放到您的 centos 或者其他服务器指定目录

2. `npm init -y && npm i express`

3. 创建这个文件 inTravel-admin-1133.js ，添加如下代码

```
  //引入express中间件
  var express = require("express");
  var app = express();

  //指定启动服务器到哪个文件夹，我这边指的是dist文件夹
  app.use(express.static("./"));

  // 监听端口为1111
  var server = app.listen(1144, function() {
    console.info("复制打开浏览器");
  });
```

3. 运行代码 `pm2 start inTravel-admin-1133.js`

4. 配置对应域名的解析操作

5. nginx.config 配置

```
      #自游 - admin
      upstream inTravelAdmin {
        server 127.0.0.1:1133;
      }

       server {
        listen       80;
        server_name  xxxx.xxxx.com;
        #charset koi8-r;

        #access_log  logs/host.access.lsog  main;

        location / {

          #设置主机头和客户端真实地址，以便服务器获取客户端真实IP
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          #禁用缓存
          proxy_buffering off;

          #反向代理的地址
          proxy_pass http://inTravelAdmin;

          root /workspace/inTravel/admin;
          index index.html index.htm;
          try_files $uri $uri/ /index.html;

        }

        location /api {
          proxy_pass http://inTravelServer;

        }




        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }




```

5. 重启 nginx sbin

### pc 端

1. `npm run buid` 把 .nuxt 和 nuxt.config.js 和 package.json 放到您的 centos 或者其他服务器指定目录

2. 创建这个文件 ecosystem.config.js ，添加如下代码

```
module.exports = {
  apps: [
    {
      name: 'inTravel-website-1122',
      script: 'nuxt',
      args: 'start',
      append_env_to_name: false,
      cwd: './',
      exec_interpreter: 'bash',
      exec_mode: 'cluster',
      out_file: './logs/out-0.log',
      error_file: './logs/err-0.log',
      merge_logs: true,
      log_data_format: 'YYYY-MM-DD HH:mm Z',
      autorestart: true,
      watch: ['./nuxt', 'nuxt.config.js', 'package.json'],
      max_memory_restart: '1G',
      node_args: '--harmony',
      env: {
        NODE_ENV: 'production',
        PORT: 1122,
      },
    },
  ],
}

```

4. 下载安装包 `npm i`

5. 运行代码 `pm2 start ./ecosystem.config.js --env production`

6. 配置对应域名的解析操作

7. nginx.config 配置

```
        #自游 - website
        upstream inTravelWebsite {
          server 127.0.0.1:1122;
        }

        server {
            listen       80;
            server_name  www.sanzhikaola.com;
            #charset koi8-r;

            #access_log  logs/host.access.lsog  main;

            location / {

              #设置主机头和客户端真实地址，以便服务器获取客户端真实IP
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              #禁用缓存
              proxy_buffering off;

              #反向代理的地址
              proxy_pass http://inTravelWebsite;

              root /workspace/inTravel/website;
              # index index.html index.htm;
              # try_files $uri $uri/ /index.html;

            }

            location /api {
              proxy_pass http://inTravelServer;

            }

            #error_page  404              /404.html;

            # redirect server error pages to the static page /50x.html
            #
            error_page   500 502 503 504  /50x.html;
            location = /50x.html {
                root   html;
            }
        }





```

5. 重启 nginx sbin
