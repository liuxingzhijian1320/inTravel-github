import React, { useEffect, useState } from 'react';
import { Modal, Input, message, Form, Button, Select } from 'antd';
import {
  userRegister,
  userDetail,
  userUpdate,
  resetPass,
} from '../assets/api/user';
import md5 from 'md5';
const { Option } = Select;

function UserAddUpdate(props) {
  const id = props.selectData?.id || 0;
  const [detail, setDetail] = useState({});
  let [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const getDetail = () => {
    userDetail({ id }).then((res) => {
      res.status = String(res.status);
      setDetail(res);
      form.setFieldsValue(res);
    });
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

  const updateField = (e) => {
    setDetail({
      ...detail,
      [e.target.id]: e.target.value,
    });

    form.setFieldsValue({
      [e.target.id]: e.target.value,
    });
  };

  const resetPasHandler = () => {
    const { email } = props.selectData;
    resetPass({ email }).then((res) => {
      message.success(`重置密码成功，新密码为 0000`);
    });
  };
  const onFinish = (values) => {
    console.log('Success:', values);
    if (!props.selectData.id) {
      userRegister({ ...values, password: md5(values.password) }).then(
        (res) => {
          message.success(res.message);
          props.fn({ needReload: true });
        }
      );
    } else {
      userUpdate({ ...values, id, status: values.status - 0 }).then((res) => {
        message.success(res.message);
        props.fn({ needReload: true });
      });
    }
  };
  return (
    <Modal
      width="40%"
      footer={null}
      title={props.selectData.id ? '编辑用户' : '新增用户'}
      visible={props.showAddUpdate}
      onCancel={props.fn}
    >
      <div className="map-model-content">
        <div id="container" style={{ width: '100%' }}>
          <Form {...layout} name="basic" onFinish={onFinish} form={form}>
            <Form.Item
              onChange={updateField}
              label="邮箱"
              name="email"
              rules={[
                {
                  required: true,
                  message: '请输入邮箱',
                },
                {
                  pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                  message: '邮箱格式不正确',
                },
              ]}
            >
              <Input disabled={props.selectData.id} />
            </Form.Item>
            <Form.Item
              onChange={updateField}
              label="昵称"
              name="nickname"
              rules={[
                {
                  required: true,
                  message: '请输入昵称',
                },
              ]}
            >
              <Input />
            </Form.Item>

            {!props.selectData.id && (
              <Form.Item
                onChange={updateField}
                label="密码"
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            )}

            {props.selectData.id && (
              <Form.Item label="重置密码">
                <Button onClick={resetPasHandler}>重置密码</Button>
              </Form.Item>
            )}

            <Form.Item label="手机号" name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="出生日期" name="born">
              <Input />
            </Form.Item>
            <Form.Item label="出生城市" name="city">
              <Input />
            </Form.Item>

            {props.selectData.id && (
              <Form.Item label="状态" name="status">
                <Select>
                  <Option value="1">正常</Option>
                  <Option value="0">禁用</Option>
                </Select>
              </Form.Item>
            )}

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

export default UserAddUpdate;
