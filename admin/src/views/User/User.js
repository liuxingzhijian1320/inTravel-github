import React, { Component, useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import {
  SearchOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
  PoweroffOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Table, Button, Form, Input, Select, Modal, message } from 'antd';
import AddUpdate from '../../components/userAddUpdate';

import {
  userList,
  upgradeAdmin,
  upgradeVisitor,
  userDelOne,
} from '../../assets/api/user';

const { Option } = Select;

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      list: [],

      email: '',
      nickname: '',
      status: '',

      showAddUpdate: false,
      selectData: {},
    };
  }

  componentDidMount() {
    this.GetList();
  }

  updateHandler(record) {
    this.setState({
      showAddUpdate: true,
      selectData: record,
    });
  }

  delHandler(text, record) {
    const { email, id } = record;

    Modal.confirm({
      title: `您确定删除 ${email} 吗？`,
      icon: <ExclamationCircleOutlined />,
      content: '删除后数据无法恢复',
      okText: '删除',
      okType: 'danger',
      cancelText: '返回',
      onOk: () => {
        userDelOne({ id }).then(() => {
          message.success('删除成功');
          this.GetList();
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 升级 管理员
  upgrade(u) {
    console.log(121, u);
    Modal.confirm({
      title: '游客账户',
      content: (
        <div>
          <p>1. 当前账号权限只能操作移动端</p>
          <p>2. 无法登录后台操作系统</p>
        </div>
      ),
      cancelText: '关闭',
      okText: '升级为管理员',
      onOk: () => {
        let userInfo = JSON.parse(localStorage.getItem('inTravel-userinfo'));
        upgradeAdmin({ admin_id: userInfo.userId, id: u.id }).then((res) => {
          message.success(res.message);
          this.GetList();
        });
      },
    });
  }

  // 降级 为 游客
  downgrade(u) {
    Modal.confirm({
      title: '管理员账户',
      content: (
        <div>
          <p>1. 当前账号权限可以操作移动端</p>
          <p>2. 可以登录后台操作系统</p>
        </div>
      ),
      cancelText: '关闭',
      okText: '降级为游客',
      onOk: () => {
        let userInfo = JSON.parse(localStorage.getItem('inTravel-userinfo'));
        upgradeVisitor({ admin_id: userInfo.userId, id: u.id }).then((res) => {
          message.success(res.message);
          this.GetList();
        });
      },
    });
  }

  // 列表
  GetList = (p) => {
    this.setState({ ...p, loading: true });
    const { pageIndex, pageSize, email, nickname, status } = this.state;
    userList({ pageIndex, pageSize, email, nickname, status }).then((res) => {
      this.setState({
        list: res.list,
        total: res.total - 0,
        loading: false,
      });
    });
  };

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

  render() {
    const { list, loading, pageIndex, total } = this.state;

    const columns = [
      {
        title: '操作',
        width: 100,
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
          </div>
        ),
      },
      {
        title: '邮箱账号',
        dataIndex: 'email',
        key: 'email',
        width: 140,
      },
      {
        title: '管理员',
        dataIndex: 'admin',
        key: 'admin',
        width: 80,
        render: (t, r) => {
          if (r.admin === 999) {
            return <span>超级管理员</span>;
          } else if (r.admin === 1) {
            return (
              <>
                <span>管理员</span>
                <Button
                  style={{ marginLeft: 10 }}
                  type="primary"
                  size="small"
                  icon={<PoweroffOutlined />}
                  onClick={() => this.downgrade(r)}
                ></Button>
              </>
            );
          } else {
            return (
              <>
                <span>游客</span>
                <Button
                  style={{ marginLeft: 10 }}
                  type="primary"
                  size="small"
                  icon={<QuestionCircleOutlined />}
                  onClick={() => this.upgrade(r)}
                ></Button>
              </>
            );
          }
        },
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
        width: 100,
      },
      {
        title: '用户状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (t, r) => {
          return r.status === 1 ? '正常' : '禁用';
        },
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        width: 80,
      },
      {
        title: '出生日期',
        dataIndex: 'born',
        key: 'born',
        width: 80,
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
      <Form.Item label="邮箱" name="email">
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item label="昵称" name="nickname">
        <Input placeholder="请输入昵称" />
      </Form.Item>
      <Form.Item label="用户状态" name="status">
        <Select style={{ width: 160 }} placeholder="请选择状态">
          <Option value="">全部</Option>
          <Option value="1">正常</Option>
          <Option value="0">禁用</Option>
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

export default withRouter(User);
