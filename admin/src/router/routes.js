import Dashboard from '../views/Dashboard/Index';
import Hotel from '../views/Hotel/Index';
import HotelDetail from '../views/Hotel/HotelDetail';
import HotelAdd from '../views/Hotel/HotelAdd';
import HotelRoom from '../views/Hotel/RoomIndex';
import HotelComment from '../views/Hotel/HotelComment';
import Email from '../views/Email/Email';
import User from '../views/User/User';
import Order from '../views/Order/Order';

import NoFoundPage from '../views/Error/404';

//eslint-disable-next-line
export default [
  {
    path: '/dashboard',
    component: Dashboard,
    title: '首页',
    meta: {
      icon: 'HomeOutlined',
      show: true,
    },
  },
  {
    path: '/hotel',
    component: Hotel,
    title: '酒店',
    meta: {
      icon: 'UserOutlined',
      show: true,
    },
  },
  {
    path: '/hotel_detail/:id',
    component: HotelDetail,
    title: '详情',
    meta: {
      icon: '',
      show: false,
    },
  },
  {
    path: '/hotel_room/:id',
    component: HotelRoom,
    title: '房间',
    meta: {
      icon: '',
      show: false,
    },
  },
  {
    path: '/hotel_add',
    component: HotelAdd,
    title: '新增',
    meta: {
      icon: '',
      show: false,
    },
  },
  {
    path: '/hotel_comment/:id',
    component: HotelComment,
    title: '评论',
    meta: {
      icon: '',
      show: false,
    },
  },

  {
    path: '/user',
    component: User,
    title: '用户',
    meta: {
      icon: 'UserOutlined',
      show: true,
    },
  },
  {
    path: '/order',
    component: Order,
    title: '订单',
    meta: {
      icon: 'UserOutlined',
      show: true,
    },
  },
  {
    path: '/email',
    component: Email,
    title: '邮箱验证码',
    meta: {
      icon: 'UserOutlined',
      show: true,
    },
  },
  {
    path: '/error/404',
    component: NoFoundPage,
    title: '404',
    meta: {
      icon: '',
      show: false,
    },
  },
];
