import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  SearchOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Table, Button, Form, Input, Select, Modal, message } from 'antd';

import {
  getHotelList,
  delHotelOne,
  upHotel,
  downHotel,
} from '../../assets/api/hotel';

import './hotel.scss';

const { Option } = Select;
const { confirm } = Modal;

class Hotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      list: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      title: '',
      type: '',
      status: '',
    };
  }

  componentDidMount() {
    this.GetList();
  }

  delHandler(text, record) {
    const { title, id } = record;

    confirm({
      title: `您确定删除 ${title} 吗？`,
      icon: <ExclamationCircleOutlined />,
      content: '删除后数据无法恢复',
      okText: '删除',
      okType: 'danger',
      cancelText: '返回',
      onOk() {
        delHotelOne({ id }).then(() => {
          message.success('删除成功');
          this.GetList();
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  upHandler(h) {
    Modal.info({
      title: `确认上架 ${h.title} 吗?`,
      onOk: () => {
        upHotel({ id: h.id }).then((res) => {
          message.success(res.message);
          this.GetList();
        });
      },
      okText: '确认',
      cancelText: '取消',
    });
  }

  downHandler(h) {
    Modal.warning({
      title: `确认下架 ${h.title} 吗?`,
      onOk: () => {
        downHotel({ id: h.id }).then((res) => {
          message.success(res.message);
          this.GetList();
        });
      },
      okText: '确认',
      cancelText: '取消',
    });
  }

  GetList = (p) => {
    this.setState({ ...p, loading: true });
    const { pageIndex, pageSize, title, type, status } = this.state;
    getHotelList({ pageIndex, pageSize, title, type, status }).then((res) => {
      this.setState({
        list: res.list,
        total: res.total - 0,
        loading: false,
      });
    });
  };

  render() {
    const { list, loading, pageIndex, total } = this.state;

    const columns = [
      {
        title: '操作',
        width: 290,
        dataIndex: 'opt',
        key: 'opt',
        fixed: 'left',
        render: (text, record) => (
          <div>
            <Button type="primary" style={{ marginRight: '10px' }}>
              <Link to={`/hotel_detail/${record.id}`}>详情</Link>
            </Button>
            <Button
              type="danger"
              style={{ marginRight: '10px' }}
              onClick={() => this.delHandler(text, record)}
            >
              删除
            </Button>
            {record.status === 0 && (
              <Button
                type="ghost"
                onClick={() => this.upHandler(record)}
                style={{ marginRight: '10px' }}
              >
                上架
              </Button>
            )}
            {record.status === 1 && (
              <Button
                type="dashed"
                onClick={() => this.downHandler(record)}
                danger
                style={{ marginRight: '10px' }}
              >
                下架
              </Button>
            )}
            <Button style={{ marginRight: '10px' }}>
              <Link to={`/hotel_room/${record.id}`}>房间</Link>
            </Button>
            <Button type="dashed" style={{ marginRight: '10px' }}>
              <Link to={`/hotel_comment/${record.id}`}>评论</Link>
            </Button>
          </div>
        ),
      },
      {
        title: '名称',
        dataIndex: 'title',
        key: 'title',
        width: 150,
      },
      {
        title: '封面',
        dataIndex: 'cover',
        key: 'cover',
        width: 60,
        render: (v) => {
          return (
            <div>
              <img width="50" height="50" src={v} alt="" />
            </div>
          );
        },
      },
      {
        title: '省/市/区',
        dataIndex: 'address',
        key: 'address',
        width: 100,
        render: (t, r) => {
          return `${r.province} ${r.city} ${r.district}`;
        },
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        width: 150,
      },
      {
        title: '等级(5分)',
        dataIndex: 'grade',
        key: 'grade',
        width: 80,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 50,
        render: (v) => {
          return v === 1 ? '已上架' : '已下架';
        },
      },
    ];
    return (
      <div>
        <SearchBox f={this.GetList} />
        <Table
          columns={columns}
          dataSource={list}
          scroll={{ x: 1350 }}
          sticky
          rowKey={(row) => row.id}
          loading={loading}
          pagination={{
            position: ['bottomCenter'],
            defaultCurrent: pageIndex,
            total,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
            onChange: (pageIndex, pageSize) => {
              this.setState(
                {
                  pageIndex,
                  pageSize,
                },
                () => {
                  this.GetList();
                }
              );
            },
          }}
        />
      </div>
    );
  }
}

function SearchBox(props) {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={(d) => props.f(d)}
      style={{ padding: 15, margin: '10px 0' }}
    >
      <Form.Item label="名称" name="title">
        <Input placeholder="请输入酒店名称" />
      </Form.Item>
      <Form.Item label="标签" name="type">
        <Select style={{ width: 160 }} placeholder="请选择标签">
          <Option value="">全部</Option>
          <Option value="hot">热门</Option>
          <Option value="lower">实惠</Option>
        </Select>
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Select style={{ width: 160 }} placeholder="请选择状态">
          <Option value="">全部</Option>
          <Option value="1">上架</Option>
          <Option value="0">下架</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          style={{ marginRight: 20 }}
          type="primary"
          htmlType="submit"
          icon={<SearchOutlined />}
        >
          搜索
        </Button>

        <Button type="primary" ghost icon={<PlusOutlined />}>
          <Link to={`/hotel_add`}>新增</Link>
        </Button>
      </Form.Item>
    </Form>
  );
}

export default withRouter(Hotel);
