import React, { Component } from 'react';
import LoginForm from '@/components/login/LoginForm';
import Logo from '@/assets/images/logo.png';
import './Login.less';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="login-header">
          <img src={Logo} alt="react後臺管理" />
          <h1>React 後臺管理系統登入頁面</h1>
        </div>
        <div className="login-content">
          <h3>用戶登錄</h3>
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default Login;
