import React, { useState, useEffect } from 'react';
import { Card, Space, Button, Table, Modal, Form, Input, message } from 'antd';

import { getRoleList, addRoleList, changeRoleAuthority } from '@/api'
import AuthForm from '@/components/role/AuthForm';
import { PAGE_SIZE } from '@/utils/constant';

const { Item } = Form;

const Role = () => {
  const [ form ] = Form.useForm();
  const [ loading, updateLoading ] =useState(true);
  const [ modalLoading, updateModalLoading ] =useState(false);

  const [ isAuthModalVisible, updateIsAuthModalVisible] = useState(false);
  const [ isAddModalVisible, updateIsAddModalVisible] = useState(false);
  const [ selectedRowKeys, updateSelectedRowKeys] = useState('');
  const [ roleList, updateRoleList ] = useState([]);

  // 取得所有角色資料
  let getRoleArray = async() => {
    const roles = await getRoleList();
    updateRoleList(roles);    
    updateLoading(false);
  }

  useEffect(() => {
    getRoleArray();
    return () => {
      getRoleArray = null;
    }
  }, [])

  // 創建角色
  const addRole = async () => {
    updateModalLoading(true);
    const { name } = form.getFieldsValue(true);
    // 創建完後重新載入所有資料
    const newRole = await addRoleList(name);
    if(newRole.ok){
      getRoleArray();
      updateModalLoading(false);
      updateIsAddModalVisible(false);
    } else {
      message.error('出現錯誤，請重試！');
      updateModalLoading(false);
    }
  }

  // 打開被點選的角色的 Modal
  const [ role, updateRole ] = useState({});
  const [ checkedKeys, updateCheckedKeys ] = useState(role.authority);

  const getSelectedRole = () => {
    // selectedRowKeys 的值會是目前被點選的radio 值
    const role = roleList.find(r => r.id === selectedRowKeys);
    updateRole(role);
    updateCheckedKeys(role.authority)
    updateIsAuthModalVisible(true);
  }

  // 更換 firestore 取得資料中的時間
  const transformTime = (time) => {
    return new Date(time).toLocaleString('zh-TW', {hour12: false}).replaceAll('/','-')
  }

  // 權限設定
  const updateAuthority = async () => {    
    updateModalLoading(true);
    // 如果更新後的權限與原本的authority值相同就不做任何處理
    if (checkedKeys === role.authority) {
      updateModalLoading(false);
      updateIsAuthModalVisible(false);
      return
    };
    const res = await changeRoleAuthority({ id: role.id, authority: checkedKeys });
    if(res.ok) {
      const newRoleList = roleList.map(item => {
        if(item.id === role.id) {
          item.authority = checkedKeys;
        }
        return item;
      })
      updateRoleList(newRoleList);
      updateModalLoading(false);
      updateIsAuthModalVisible(false);
    }
  }
  
  const columns = [
    {
      title: '角色名稱',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '創建時間',
      dataIndex: 'created_At',
      key: 'created_At',
      render:(text, record, index) => transformTime(record.created_At.seconds * 1000)
    },
    {
      title: '授權時間',
      dataIndex: 'authorization_At',
      key: 'authorization_At',
      render:(text, record, index) => record.authorization_At.seconds?transformTime(record.authorization_At.seconds * 1000): ''
    },
    {
      title: '授權人',
      dataIndex: 'authorizer',
      key: 'authorizer',
    },
  ];

  return (
    <Card
    title={
      <Space>
        <Button type="primary" onClick={() =>{ updateIsAddModalVisible(true) }}>創建角色</Button>
        <Button type="primary" disabled={!selectedRowKeys} onClick={getSelectedRole}>設置角色權限</Button>
      </Space>
    }>
      <Table
      loading={loading}
      onRow={record=> ({ onClick: e => {updateSelectedRowKeys(record.id)}}) }
      rowSelection={{type: 'radio', selectedRowKeys: [selectedRowKeys]}}
      rowKey="id" dataSource={roleList} columns={columns} pagination={{ pageSize: PAGE_SIZE}} />;
      <Modal title="添加角色" destroyOnClose
        confirmLoading={modalLoading}
        visible={isAddModalVisible}
        onOk={addRole}
        onCancel={() => { updateIsAddModalVisible(false) }}
      >
        <Form name="newRoleForm" form={form}>
          <Item name="name" label="角色名稱：" rules={[{ required: true }]}>
            <Input placeholder="輸入創建角色名稱" />
          </Item>
        </Form>
      </Modal>
      <Modal title="更改權限" destroyOnClose
        confirmLoading={modalLoading}
        onCancel={() => { updateIsAuthModalVisible(false) }}
        visible={isAuthModalVisible}
        onOk={updateAuthority}
      >
        <AuthForm role={role} updateCheckedKeys={updateCheckedKeys} />
      </Modal>
    </Card>
  );
}

export default Role;
