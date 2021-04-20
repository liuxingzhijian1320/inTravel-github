import React, { Component, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Table, Button, Form, Select, Modal, message } from 'antd';
import { getOrderList, orderDelOne } from '../../assets/api/order';
const { Option } = Select;

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      list: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,

      status: '',
    };
  }

  componentDidMount() {
    this.GetList();
  }

  delHandler(text, record) {
    const { order_no, id } = record;

    Modal.confirm({
      title: `您确定删除订单号为${order_no}吗？`,
      icon: <ExclamationCircleOutlined />,
      content: '删除后数据无法恢复',
      okText: '删除',
      okType: 'danger',
      cancelText: '返回',
      onOk: () => {
        orderDelOne({ id }).then(() => {
          message.success('删除成功');
          this.GetList();
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 列表
  GetList = (p) => {
    this.setState({ ...p, loading: true });
    const { pageIndex, pageSize, status } = this.state;
    getOrderList({ pageIndex, pageSize, status }).then((res) => {
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
        width: 60,
        dataIndex: 'opt',
        key: 'opt',
        fixed: 'left',
        render: (text, record) => (
          <div>
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
        title: '订单编号',
        dataIndex: 'order_no',
        key: 'order_no',
        width: 150,
      },
      {
        title: '下单人',
        dataIndex: 'price',
        key: 'price',
        width: 200,
        render: (text, record) => {
          return (
            <div>
              {record.user.nickname}({record.user.email})
            </div>
          );
        },
      },
      {
        title: '总金额(元)',
        dataIndex: 'price',
        key: 'price',
        width: 100,
      },
      {
        title: '总人数(人)',
        dataIndex: 'people',
        key: 'status',
        width: 100,
      },
      {
        title: '房间数(间)',
        dataIndex: 'rooms',
        key: 'phone',
        width: 80,
      },
      {
        title: '起止时间',
        dataIndex: 'start',
        key: 'start',
        width: 180,
        render: (t, r) => {
          return r.start + '-' + r.end;
        },
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
        width: 180,
        render: (t, r) => {
          return r.status === 1 ? '进行中' : '支付完成';
        },
      },
    ];
    return (
      <div>
        <SearchBox f={this.GetList} fnAdd={this.fnAdd} />
        <Table
          columns={columns}
          dataSource={list}
          scroll={{ x: 1550 }}
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
      <Form.Item label="状态" name="status">
        <Select style={{ width: 160 }} placeholder="请选择状态">
          <Option value="">全部</Option>
          <Option value="1">进行中</Option>
          <Option value="2">支付完成</Option>
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
      </Form.Item>
    </Form>
  );
}

export default withRouter(Order);
