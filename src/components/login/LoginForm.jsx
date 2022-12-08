import React, { Fragment, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { updateCurrentUser } from '@/redux/actions';
import { getStorage } from '@/utils/storageUtil.js';
import {login} from '@/api';

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [btnLoading, updateBtnLoading] = useState(false)

  const onFinish = async (values)=>{
    updateBtnLoading(true);
    // console.log('驗證數據成功符合規則', values);
    const res = await login(values);
    if(res.ok){
      // 數據經 Firebase Auth 驗證成功後
      message.success('登入成功');
      props.updateCurrentUser(getStorage());
      updateBtnLoading(false);
      navigate('/', { replace: true });
    }
    else{
      updateBtnLoading(false);
    }
  }

  const validatePwd = (rule, value) => {
    if(!value || value.length < 6){
      return Promise.reject()
    }else{
      return Promise.resolve()
    }
  }

  return (
    <Fragment>
      {/* 注意到 antd 送出事件為 onFinish 不是 onSubmit*/}
      <Form
        name="login"
        autoComplete="off"
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '必須輸入電子信箱',
            },
          ]}
        >
          <Input placeholder="admin@admin.com"
          prefix={<UserOutlined style={{color: 'rgba(0,0,0,.45)'}} />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              validator: validatePwd,
              message: '密碼輸入錯誤',
            },
          ]}
        >
          <Input.Password
            placeholder="admin1234"
            prefix={<LockOutlined style={{color: 'rgba(0,0,0,.45)'}} />}
          />
        </Form.Item>

        <Button loading={btnLoading} type="primary" htmlType="submit" block >
          登入
        </Button>
      </Form>
    </Fragment>
  )
}

export default connect(
  state => ({ currentUser: state.currentUser,}),
  {
    updateCurrentUser
  }
)(LoginForm)