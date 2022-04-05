import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';

import { Card, Space, Button, Table, Modal, Form, Input, message } from 'antd';

import AuthForm from '@/components/role/AuthForm';
import { getRoleList, createRole, changeRoleAuthority } from '@/api';
// import { getStorage } from '@/utils/storageUtil';
import { PAGE_SIZE } from '@/utils/constant';

const { Item } = Form;

const Role = (props) => {
  const [ form ] = Form.useForm();
  const [{
    loading,
    modalLoading,
    isAuthModalVisible,
    isAddModalVisible,
    selectedRowKeys,
    roleList,
    role,
    checkedKeys
  }, setState] = useReducer((pre, next) => ({...pre, ...next}), {
    loading: true,
    modalLoading: false,
    isAuthModalVisible: false,
    isAddModalVisible: false,
    selectedRowKeys: '',
    roleList: [],
    role: {
      authority: []
    },
    checkedKeys: ''
  })

  // 取得所有角色資料
  let getRoleArray = async() => {
    const roleList = await getRoleList();
    setState({roleList, loading: false, checkedKeys: role.authority});
  }

  useEffect(() => {
    getRoleArray();
    return () => {
      getRoleArray = null;
    }
  }, [])
  


  // 創建角色
  const addRole = async () => {
    setState({modalLoading: true});
    const { name } = form.getFieldsValue(true);
    // 創建完後重新載入所有資料
    const newRole = await createRole(name);
    if(newRole.ok){
      getRoleArray();
      setState({modalLoading: false, isAddModalVisible: false});
    } else {
      message.error('出現錯誤，請重試！');
      setState({modalLoading: false});

    }
  }

  // 打開被點選的角色的 Modal
  const getSelectedRole = () => {
    // selectedRowKeys 的值會是目前被點選的radio 值
    const role = roleList.find(r => r.id === selectedRowKeys);
    setState({role, checkedKeys: role.authority, isAuthModalVisible: true});
  }

  // 更換 firestore 取得資料中的時間
  const transformTime = (time) => {
    return new Date(time).toLocaleString('zh-TW', {hour12: false}).replaceAll('/','-')
  }

  // 權限設定
  const updateAuthority = async () => {    
    setState({modalLoading: true});
    // 如果更新後的權限與原本的authority值相同就不做任何處理
    if (checkedKeys === role.authority) {
      setState({modalLoading: false, isAuthModalVisible: false});
      return
    };
    // const user = getStorage();
    const { currentUser: user } = props;
    const { ok, authorization_At} = await changeRoleAuthority({ id: role.id, authority: checkedKeys, authorizer: user.displayName });
    if(ok) {
      const newRoleList = roleList.map(item => {
        if(item.id === role.id) {
          item.authority = checkedKeys;
          item.authorizer = user.displayName;
          item.authorization_At = authorization_At;
        }
        return item;
      })
      setState({ roleList: newRoleList, modalLoading: false, isAuthModalVisible: false})
    }
  }
  const radioOnSelect = (record)=> {
    setState({ selectedRowKeys: record.id })
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
      render:(text, record, index) => text
    },
  ];

  return (
    <Card
    title={
      <Space>
        <Button type="primary" onClick={() =>{ setState({isAddModalVisible: true}) }}>創建角色</Button>
        <Button type="primary" disabled={!selectedRowKeys} onClick={getSelectedRole}>設置角色權限</Button>
      </Space>
    }>
      <Table
      loading={loading}
      onRow={record => ({ onClick: e => { radioOnSelect(record) } }) }
      rowSelection={{type: 'radio', selectedRowKeys: [selectedRowKeys], onSelect: radioOnSelect}}
      rowKey="id" dataSource={roleList} columns={columns} pagination={{ pageSize: PAGE_SIZE}} />;
      <Modal title="添加角色" destroyOnClose
        confirmLoading={modalLoading}
        visible={isAddModalVisible}
        onOk={addRole}
        onCancel={() => { setState({ isAddModalVisible: false }) }}
      >
        <Form name="newRoleForm" form={form}>
          <Item name="name" label="角色名稱：" rules={[{ required: true }]}>
            <Input placeholder="輸入創建角色名稱" />
          </Item>
        </Form>
      </Modal>
      <Modal title="更改權限" destroyOnClose
        confirmLoading={ modalLoading }
        onCancel={() => { setState({ isAuthModalVisible: false }) }}
        visible={isAuthModalVisible}
        onOk={updateAuthority}
      >
        <AuthForm role={role} setState={setState} />
      </Modal>
    </Card>
  );
}

export default connect(
  (state) => ({
    currentUser: state.currentUser,
  })
)(Role);
