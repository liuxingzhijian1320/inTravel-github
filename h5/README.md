# inTravel-h5

## 访问地址

## Project setup

```
yarn install

yarn dev

yarn build
```

## vue3 的文档

[文档入口](https://www.vue3js.cn/docs/zh/)

## nginx.conf

```
    server {
        listen       80;
        server_name  xxx.xxx.cn;
        access_log off;

        location / {
            root   /workspace/cnodejs/;
            index index.html index.htm;
		    try_files $uri $uri/ /index.html;
         }
    }

```
