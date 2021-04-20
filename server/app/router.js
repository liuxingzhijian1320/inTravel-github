'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt } = app;
  // 用户
  router.post('/api/user/create', controller.user.createUser);
  router.post('/api/user/login', controller.user.loginUser);
  router.post('/api/user/adminLogin', controller.user.loginAdminUser);
  router.post('/api/user/del', jwt, controller.user.delUser);
  router.get('/api/user/list', jwt, controller.user.listUser);
  router.get('/api/user/detail', jwt, controller.user.detailUser);
  router.post('/api/user/update', jwt, controller.user.updateUser);
  router.post(
    '/api/user/updatePassword',
    jwt,
    controller.user.updateUserPassword
  );
  router.post('/api/user/resetPassword', controller.user.resetUserPassword);
  router.post(
    '/api/user/resetPasswordByAdmin',
    controller.user.resetUserPasswordByAdmin
  );
  router.post('/api/user/upgrade', jwt, controller.user.upgradeUserAdmin);
  router.post('/api/user/downgrade', jwt, controller.user.downGradeUserAdmin);

  // 邮箱
  router.post('/api/email/send', controller.email.emailSendCode);
  router.get('/api/email/list', jwt, controller.email.emailListCode);

  // 上传文件
  router.post('/api/file/upload', controller.file.fileUpload);

  // 酒店
  router.post('/api/hotel/create', jwt, controller.hotel.createHotel);
  router.get('/api/hotel/list', controller.hotel.listHotel);
  router.get('/api/hotel/detail', controller.hotel.detailHotel);
  router.post('/api/hotel/del', jwt, controller.hotel.delHotel);
  router.post('/api/hotel/update', jwt, controller.hotel.updateHotel);
  router.post('/api/hotel/up', jwt, controller.hotel.upHotel);
  router.post('/api/hotel/down', jwt, controller.hotel.downHotel);

  // 收藏
  router.post('/api/collect/setCollect', jwt, controller.collect.setCollect);
  router.get('/api/collect/detail', jwt, controller.collect.detailCollect);
  router.get('/api/collect/list', jwt, controller.collect.listCollect);

  // 房间
  router.post('/api/room/create', jwt, controller.room.createRoom);
  router.get('/api/room/list', controller.room.listRoom);
  router.get('/api/room/detail', controller.room.detailRoom);
  router.post('/api/room/del', jwt, controller.room.delRoom);
  router.post('/api/room/update', jwt, controller.room.updateRoom);
  router.post('/api/room/up', jwt, controller.room.upRoom);
  router.post('/api/room/down', jwt, controller.room.downRoom);

  // 评论
  router.post('/api/comment/create', jwt, controller.comment.createComment);
  router.get('/api/comment/list', controller.comment.listComment);
  router.get('/api/comment/detail', controller.comment.detailComment);
  router.post('/api/comment/del', jwt, controller.comment.delComment);
  router.post('/api/comment/update', jwt, controller.comment.updateComment);

  // 回复
  router.post('/api/reply/create', jwt, controller.reply.createReply);

  // 保存用户搜索记录
  router.post('/api/record/create', jwt, controller.record.createRecord);
  router.get('/api/record/list', jwt, controller.record.listRecord);

  // 订单
  router.post('/api/order/create', jwt, controller.orderno.createOrder);
  router.get('/api/order/list', jwt, controller.orderno.listOrder);
  router.get('/api/order/detail', jwt, controller.orderno.detailOrder);
  router.post('/api/order/del', jwt, controller.orderno.delOrder);
  router.post('/api/order/status', jwt, controller.orderno.updateOrderStatus);
  // router.post('/api/order/update', controller.orderno.updateOrder);
};
