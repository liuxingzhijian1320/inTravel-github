import React from 'react';
import md5 from 'md5';
import './login.scss';
import { Input, Button, message } from 'antd';
import { userLogin } from '../../assets/api/user';

class Login extends React.Component {
  render() {
    let formData = {
      email: '',
      password: '',
    };

    const getEmail = (e) => {
      formData.email = e.target.value;
    };

    const getPassword = (e) => {
      formData.password = e.target.value;
    };

    const submit = async () => {
      const { email, password } = formData;
      if (!email) {
        message.error('登录邮箱不能为空');
      } else if (!password) {
        message.error('密码不能为空');
      } else {
        await userLogin({ email, password: md5(password) }).then((res) => {
          localStorage.setItem('inTravel-userinfo', JSON.stringify(res));
          localStorage.setItem('inTravel-userinfo-token', res.token);
          message.success('主人，欢迎回来!');
          this.props.history.push('/');
        });
      }
    };

    // console.info(234, this.props);

    return (
      <div className="login dc">
        <div className="content">
          <div className="title">欢迎进入自游管理系统</div>
          <div className="subtitle">WELCOME TO INTRAVEL SYSTEM</div>
          <div className="login-box">
            <div className="ipt">
              <img
                className="icon"
                src={require('../../assets/images/icon-user.png').default}
                alt=""
              />
              <Input
                size="small"
                onChange={getEmail}
                placeholder="登录邮箱"
                className="input"
              />
            </div>
            <div className="ipt">
              <img
                className="icon"
                src={require('../../assets/images/icon-lock.png').default}
                alt=""
              />
              <Input.Password
                size="small"
                onChange={getPassword}
                placeholder="登录密码"
                className="input input-demo"
              />
            </div>
            <div className="subbtn">
              <Button className="submit-btn" type="primary" onClick={submit}>
                登录
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
