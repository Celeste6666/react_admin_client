import React, { useState, useEffect } from 'react'
import { Form, Input, Select } from 'antd';


const { Item } = Form;
const { Option } = Select;

const AddForm = props => {
  const { form, roleList } = props;

  return (
  <Form name="newRoleForm" preserve={false}
  form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16}} labelAlign="right"
  initialValues={{
    displayName: '',
    phoneNumber: '',
    email: '',
  }}
  >
    <Item name="displayName" label="用戶名：" rules={[{ required: true, message: '必須輸入' }]}>
      <Input placeholder="輸入創建用戶名" />
    </Item>
    <Item name="phoneNumber" label="手機號：" type="tel" rules={[{ required: true, message: '必須輸入' }]}>
      <Input  min={10} max={10} placeholder="輸入手機號" />
    </Item>
    <Item name="email" label="郵箱：" rules={[{ required: true, message: '必須輸入' }]}>
      <Input type="email" placeholder="輸入郵箱" />
    </Item>
    <Item name="roleId" label="角色：" rules={[
      {required: true, message: '必須輸入' }
      ]}>
    <Select placeholder="請選擇所屬角色">
      {
        roleList.map(r => (<Option value={r.id} key={r.id}>{r.name}</Option>))
      }    
    </Select>
    </Item>
  </Form>
  )
}

export default AddForm