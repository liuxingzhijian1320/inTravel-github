import React, { Component, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import {
  SearchOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Table, Button, Form, Input, Select, Modal, message } from 'antd';

import { delRoom, upRoom, downRoom, getRoomList } from '../../assets/api/hotel';
import AddUpdate from '../../components/roomAddUpdate';
import './hotel.scss';

const { Option } = Select;
const { confirm } = Modal;

class RoomIndex extends Component {
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

      showAddUpdate: false,
      selectData: {},
    };
  }

  updateHandler(record) {
    this.setState({
      showAddUpdate: true,
      selectData: record,
    });
  }

  componentDidMount() {
    this.GetList();
  }

  fn = ({ needReload = false }) => {
    if (needReload) {
      this.GetList();
    }
    this.setState({ showAddUpdate: false });
  };

  fnAdd = () => {
    this.setState({
      showAddUpdate: true,
      selectData: {},
    });
  };

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
        delRoom({ id }).then(() => {
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
        upRoom({ id: h.id }).then((res) => {
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
        downRoom({ id: h.id }).then((res) => {
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
    getRoomList({
      pageIndex,
      pageSize,
      title,
      type,
      status,
      hotel_id: this.props.match.params.id,
    }).then((res) => {
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
        width: 150,
        dataIndex: 'opt',
        key: 'opt',
        fixed: 'left',
        render: (text, record) => (
          <div>
            <Button
              type="primary"
              onClick={() => this.updateHandler(record)}
              style={{ marginRight: '10px' }}
            >
              详情
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
          </div>
        ),
      },
      {
        title: '房间名',
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
        title: '最大居住人数',
        dataIndex: 'max',
        key: 'max',
        width: 100,
      },
      {
        title: '标签',
        dataIndex: 'type',
        key: 'type',
        width: 50,
        render: (t, r) => {
          // one 单人间 two 双人间 big 大床房 room 套房 theme 主题房
          let typeName = '';
          switch (r.type) {
            case 'one':
              typeName = '单人间';
              break;
            case 'two':
              typeName = '双人间';
              break;
            case 'big':
              typeName = '大床房';
              break;
            case 'room':
              typeName = '套房';
              break;
            case 'theme':
              typeName = '主题房';
              break;

            default:
              break;
          }
          return typeName;
        },
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
        <SearchBox f={this.GetList} fnAdd={this.fnAdd} />
        <Table
          columns={columns}
          dataSource={list}
          scroll={{ x: 1250 }}
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
        {this.state.showAddUpdate && (
          <AddUpdate
            hotel_id={this.props.match.params.id}
            selectData={this.state.selectData}
            fn={this.fn}
            showAddUpdate={this.state.showAddUpdate}
          />
        )}
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
        <Input placeholder="请输入房间名称" />
      </Form.Item>
      <Form.Item label="标签" name="type">
        <Select style={{ width: 160 }} placeholder="请选择标签">
          <Option value="">全部</Option>
          <Option value="one">单人间</Option>
          <Option value="two">双人间</Option>
          <Option value="big">大床房</Option>
          <Option value="room">套房</Option>
          <Option value="theme">主题房</Option>
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

        <Button
          type="primary"
          onClick={props.fnAdd}
          ghost
          icon={<PlusOutlined />}
        >
          新增
        </Button>
      </Form.Item>
    </Form>
  );
}

export default withRouter(RoomIndex);
