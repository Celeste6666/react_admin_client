import React, { Component, Fragment } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class 我是表單 extends Component {
  onFinish=(values)=>{
    console.log('驗證數據成功符合規則', values)
  }

  onFinishFailed = 	(errorInfo)=>{
    console.log('數據驗證失敗後的回調', errorInfo);
  }

  validatePwd = (rule, value) => {
    console.log(rule, value);
    if(!value || value.length!== 5){
      return Promise.reject()
    }else{
      return Promise.resolve()
    }
  }

  render() {
    return (
      <Fragment>
        {/* 注意到 antd 送出事件為 onFinish 不是 onSubmit*/}
        <Form
          name="login"
          autoComplete="off"
          className="login-form"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
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
                validator: this.validatePwd,
                message: '密碼輸入錯誤',
              },
            ]}
          >
            <Input.Password
              placeholder="admin"
              prefix={<LockOutlined style={{color: 'rgba(0,0,0,.45)'}} />}
            />
          </Form.Item>
    
          <Button type="primary" htmlType="submit" block >
            登錄
          </Button>
        </Form>
      </Fragment>
    )
  }
}
