import React, { useEffect, useState } from 'react';
import { Modal, Input, message, Form, Button, Select } from 'antd';
import { addRoom, updateRoom, roomDetail } from '../assets/api/hotel';

import UploadCustom from './UploadCustom';
const { Option } = Select;

function RoomAddUpdate(props) {
  const id = props.selectData?.id || 0;
  const [detail, setDetail] = useState({});
  let [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const getDetail = () => {
    roomDetail({ id }).then((res) => {
      res.status = String(res.status);
      setDetail(res);
      form.setFieldsValue(res);
    });
  };

  const uploadSuccess = (type, data) => {
    if (type === 'done') {
      setDetail({
        ...detail,
        cover: data,
      });
      form.setFieldsValue({
        cover: data,
      });
    } else if (type === 'removed') {
      setDetail({
        ...detail,
        cover: '',
      });
      form.setFieldsValue({
        cover: '',
      });
    }
  };
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 10,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };

  const onFinish = (values) => {
    // console.log('detail:', detail);
    // console.log('Success:', values);
    if (!props.selectData.id) {
      addRoom({ ...values, hotel_id: props.hotel_id }).then((res) => {
        message.success(res.message);
        props.fn({ needReload: true });
      });
    } else {
      updateRoom({
        ...values,
        id,
        status: values.status - 0,
        max: values.max - 0,
        hotel_id: props.hotel_id,
        price: values.price - 0,
      }).then((res) => {
        message.success(res.message);
        props.fn({ needReload: true });
      });
    }
  };
  return (
    <Modal
      width="40%"
      footer={null}
      title={props.selectData.id ? '编辑房间' : '新建房间'}
      visible={props.showAddUpdate}
      onCancel={props.fn}
    >
      <div className="map-model-content">
        <div id="container" style={{ width: '100%' }}>
          <Form {...layout} name="basic" onFinish={onFinish} form={form}>
            <Form.Item
              label="房间名称"
              name="title"
              rules={[
                {
                  required: true,
                  message: '请输入房间名称',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="封面"
              name="cover"
              rules={[
                {
                  required: true,
                  message: '请上传封面',
                },
              ]}
            >
              <UploadCustom imageUrl={detail.cover} fn={uploadSuccess} />
            </Form.Item>

            <Form.Item
              label="价格"
              name="price"
              rules={[
                {
                  required: true,
                  message: '请输入价格',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="标签" name="type">
              <Select placeholder="请选择标签">
                <Option value="">全部</Option>
                <Option value="one">单人间</Option>
                <Option value="two">双人间</Option>
                <Option value="big">大床房</Option>
                <Option value="room">套房</Option>
                <Option value="theme">主题房</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="最大居住人数"
              name="max"
              rules={[
                {
                  required: true,
                  message: '请输入人数',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="状态" name="status">
              <Select>
                <Option value="1">正常</Option>
                <Option value="0">禁用</Option>
              </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

export default RoomAddUpdate;
