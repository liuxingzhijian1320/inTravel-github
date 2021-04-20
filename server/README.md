## 自游 接口文档

1. 登录
2. 注册
3. 重置密码
4. 修改密码
5. 修改用户信息

6. 最近搜索记录
7. 最受欢迎酒店+最实惠价格（type 类型， keywords 模糊搜索）
8. 删除用户历史（本地缓存）
9. 预定记录
10. 订单状态（已完成，已取消，进行中）
11. 收藏列表（添加／取消）
12. 酒店列表
13. 酒店预定
14. 评论列表
15. 创建评论

## 返回状态吗

200 成功
201 参数校验失败
401 没有权限
422 当创建一个对象时，发生一个验证错误

## 字段

1. 用户表 user

| 字段        | 解释     | type              |
| ----------- | -------- | ----------------- |
| nickname    | 昵称     | string            |
| password    | 密码     | string            |
| email       | 邮箱     | string            |
| phone       | 密码     | string            |
| born        | 出生日期 | date              |
| city        | 所在城市 | string            |
| admin       | 管理员   | init （999 1 0 ） |
| create_time | 创建时间 | timestamp         |
| update_time | 更新时间 | timestamp         |

2. 酒店表 hotel

- 2.1 酒店

| 字段         | 解释     | type      |
| ------------ | -------- | --------- |
| title        | 名称     | string    |
| address      | 地址     | string    |
| lat          | 经度     | string    |
| lng          | 纬度     | string    |
| province     | 省       | string    |
| city         | 市       | string    |
| district     | 区       | string    |
| provinceCode | 省 code  | int       |
| cityCode     | 市 code  | int       |
| districtCode | 区 code  | int       |
| desc         | 简介     | string    |
| cover        | 封面图   | string    |
| type         | 标签     | string    |
| grade        | 评分     | number    |
| pics         | 图集     | string    |
| status       | 状态     | string    |
| create_time  | 创建时间 | timestamp |
| update_time  | 更新时间 | timestamp |

- 2.2 房间

  | 字段        | 解释         | type      |
  | ----------- | ------------ | --------- |
  | hotel_id    | 酒店 id      | int       |
  | title       | 房间名称     | string    |
  | cover       | 房间封面图   | string    |
  | type        | 标签         | string    |
  | price       | 价格         | number    |
  | max         | 最大居住人数 | number    |
  | status      | 房间状态     | string    |
  | create_time | 创建时间     | timestamp |
  | update_time | 更新时间     | timestamp |

3. 验证码 email_code

| 字段        | 解释     | type      |
| ----------- | -------- | --------- |
| code        | 验证码   | string    |
| emial       | 邮箱     | string    |
| code_type   | 类型     | string    |
| count       | 发送次数 | int       |
| create_time | 创建时间 | timestamp |
| update_time | 更新时间 | timestamp |

4. 评论回复表

- 4.1 评论表 comment

| 字段        | 解释        | type      |
| ----------- | ----------- | --------- |
| id          | 主键        | int       |
| hotel_id    | 酒店        | int       |
| content     | 内容        | string    |
| user_id     | 评论用户 id | int       |
| create_time | 创建时间    | timestamp |
| update_time | 更新时间    | timestamp |

- 4.2 回复表 reply

| 字段        | 解释        | type      |
| ----------- | ----------- | --------- |
| id          | 主键        | int       |
| comment_id  | 评论 id     | int       |
| content     | 内容        | string    |
| to_id       | 目标用户 id | int       |
| from_id     | 评论用户 id | int       |
| create_time | 创建时间    | timestamp |
| update_time | 更新时间    | timestamp |

5. 搜索记录 record (需要对 hotel_id && user_id 做唯一索引)

| 字段        | 解释     | type      |
| ----------- | -------- | --------- |
| id          | 主键     | int       |
| hotel_id    | 酒店 id  | int       |
| user_id     | 用户 id  | int       |
| create_time | 创建时间 | timestamp |
| update_time | 更新时间 | timestamp |

6. 订单

| 字段        | 解释     | type      |
| ----------- | -------- | --------- |
| id          | 主键     | int       |
| hotel_id    | 酒店 id  | int       |
| room_id     | 房间 id  | int       |
| user_id     | 用户 id  | int       |
| order_no    | 订单编号 | string    |
| price       | 价格     | int       |
| people      | 人数     | int       |
| rooms       | 房间数   | int       |
| start       | 开始时间 | string    |
| end         | 结束时间 | string    |
| status      | 状态     | int       |
| create_time | 创建时间 | timestamp |
| update_time | 更新时间 | timestamp |
