import React, { useState } from 'react';
import { withRouter } from 'react-router';
import {
  Card,
  Layout,
  Form,
  Input,
  Select,
  Slider,
  Cascader,
  Button,
  message,
} from 'antd';
import _ from 'lodash';
import { addHotelDetail } from '../../assets/api/hotel';
import UploadCustom from '../../components/UploadCustom';
import MyMap from '../../components/Map';
import cityData from '../../assets/scripts/cityData';
const { Option } = Select;
const { Content } = Layout;
const { TextArea, Search } = Input;

const LIMIT = 9;

function HotelDetail(props) {
  let [form] = Form.useForm();

  const [detail, setDetail] = useState({
    title: '',
    address: '',
    lat: '',
    lng: '',
    desc: '',
    cover: '',
    type: '',
    grade: '',
    pics: '',
    status: '1',
    province: '',
    provinceCode: '',
    city: '',
    cityCode: '',
    district: '',
    districtCode: '',
  });
  const [show, setShow] = useState(false);

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

  const uploadSuccessList = (type, data) => {
    let list = detail.pics ? detail.pics.split(',') : [];
    if (type === 'done') {
      list.push(data);
    } else if (type === 'removed') {
      list.forEach((code, i) => {
        list.splice(i, 1);
      });
    }
    setDetail({
      ...detail,
      pics: list.join(','),
    });

    form.setFieldsValue({
      pics: list.join(','),
    });
  };

  const getMapValue = (v) => {
    // console.log('getMapValue', v, detail);
    setDetail({
      ...detail,
      ...v,
    });

    form.setFieldsValue({
      ...v,
    });
  };

  const openModel = () => {
    setShow(true);
  };

  const onOk = () => {
    setShow(false);
  };

  const onCancel = () => {
    setShow(false);
  };

  const updateField = (e) => {
    // console.log(444, e.target.name, e.target.value);
    setDetail({
      ...detail,
      [e.target.id]: e.target.value,
    });

    form.setFieldsValue({
      [e.target.id]: e.target.value,
    });
  };

  const selectType = (e) => {
    form.setFieldsValue({
      type: e,
    });
    setDetail({
      ...detail,
      type: e,
    });
    // console.log(12313, form.getFieldsValue());
  };

  const selectStatus = (e) => {
    form.setFieldsValue({
      status: e,
    });
    setDetail({
      ...detail,
      status: e,
    });
    // console.log(12313, form.getFieldsValue());
  };

  const slideChange = (e) => {
    form.setFieldsValue({
      grade: e,
    });
    setDetail({
      ...detail,
      grade: e,
    });
    // console.log(12313, form.getFieldsValue());
  };

  const changeCity = (e) => {
    // console.log(234, e);

    if (e.length === 0) {
      let obj = {
        province: '',
        provinceCode: 0,
        city: '',
        cityCode: 0,
        district: '',
        districtCode: 0,
      };

      setDetail({
        ...detail,
        ...obj,
      });

      form.setFieldsValue({
        ...obj,
      });

      // console.log(9, form.getFieldsValue());
    } else {
      const [p, c, d] = e;
      let o_p = cityData.find((m) => m.value === p);
      let o_c = o_p.children.find((m) => m.value === c);
      let o_d = o_c.children.find((m) => m.value === d);
      // console.log(333, detail);
      // console.log(44, e, o_p, o_c, o_d);

      setDetail({
        ...detail,
        province: o_p.label,
        provinceCode: o_p.value,
        city: o_c.label,
        cityCode: o_c.value,
        district: o_d.label,
        districtCode: o_d.value,
      });

      form.setFieldsValue({
        province: o_p.label,
        provinceCode: o_p.value,
        city: o_c.label,
        cityCode: o_c.value,
        district: o_d.label,
        districtCode: o_d.value,
      });
    }
  };

  const back = () => {
    props.history.goBack();
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    console.log('Success---detail:', detail);
    const { province, city, district } = detail;
    if (!province || !city || !district) {
      message.error('请完善区域信息');
      return;
    }

    let params = _.cloneDeep(detail);
    params.status = params.status - 0;
    params.lng = String(params.lng);
    params.lat = String(params.lat);

    addHotelDetail(params).then(() => {
      message.success('新增成功');
      props.history.goBack();
    });
  };

  return (
    <div>
      <Content>
        <Card title="新增酒店" style={{ marginTop: '10px' }}>
          {
            <Form
              form={form}
              labelCol={{ span: 4 }}
              onFinish={onFinish}
              layout="horizontal"
            >
              <Form.Item
                label="酒店名称"
                name="title"
                onChange={updateField}
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: '请输入酒店名称!',
                  },
                ]}
              >
                <Input style={{ width: 400 }} placeholder="请输入酒店名称" />
              </Form.Item>

              <Form.Item label="所属区域">
                <Cascader
                  style={{ width: 400 }}
                  options={cityData}
                  value={[detail.province, detail.city, detail.district]}
                  onChange={changeCity}
                  placeholder="请选择区域"
                />
              </Form.Item>
              <Form.Item
                label="地址"
                name="address"
                onChange={updateField}
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: '请输入地址!',
                  },
                ]}
              >
                <Search
                  placeholder="请输入地址"
                  onSearch={openModel}
                  style={{ width: 400 }}
                  enterButton="查看定位"
                />
              </Form.Item>

              <Form.Item
                label="简介"
                name="desc"
                validateTrigger="onBlur"
                onChange={updateField}
                rules={[
                  {
                    required: true,
                    message: '请输入酒店简介!',
                  },
                ]}
              >
                <TextArea
                  style={{ width: 700 }}
                  autoSize
                  placeholder="请输入酒店简介"
                />
              </Form.Item>
              <Form.Item
                label="封面"
                name="cover"
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: '请上传封面图!',
                  },
                ]}
              >
                <UploadCustom imageUrl={detail.cover} fn={uploadSuccess} />
              </Form.Item>
              <Form.Item
                label="图集"
                name="pics"
                validateTrigger="onBlur"
                rules={[
                  {
                    required: true,
                    message: '请输入酒店图集!',
                  },
                ]}
              >
                <>
                  <UploadCustom
                    imageUrl={detail.pics}
                    imageMultiple={true}
                    imageLimit={LIMIT}
                    fn={uploadSuccessList}
                  />
                  <span>最多上传{LIMIT}张</span>
                </>
              </Form.Item>
              <Form.Item label="标签" name="type">
                <Select style={{ width: 400 }} onChange={selectType}>
                  <Option value="">全部</Option>
                  <Option value="hot">热门</Option>
                  <Option value="lower">优惠</Option>
                </Select>
              </Form.Item>
              <Form.Item label="评分" name="grade">
                <Slider
                  style={{ width: 400 }}
                  min={1}
                  max={5}
                  step={0.1}
                  onChange={slideChange}
                />
              </Form.Item>
              <Form.Item label="状态" name="status">
                <Select style={{ width: 400 }} onChange={selectStatus}>
                  <Option value="1">已上架</Option>
                  <Option value="0">已下架</Option>
                </Select>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 4 }}>
                <Button onClick={back} type="info" htmlType="submit">
                  返回
                </Button>

                <Button
                  type="primary"
                  style={{ marginLeft: 30 }}
                  htmlType="submit"
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          }
        </Card>

        {show && (
          <MyMap
            show={show}
            province={detail.province}
            city={detail.city}
            district={detail.district}
            address={detail.address}
            lat={detail.lat}
            lng={detail.lng}
            fn={getMapValue}
            onOk={onOk}
            onCancel={onCancel}
          />
        )}
      </Content>
    </div>
  );
}

export default withRouter(HotelDetail);
