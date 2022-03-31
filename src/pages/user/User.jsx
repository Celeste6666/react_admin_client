import React, { useReducer, useEffect } from 'react';
import { Card, Space, Button, Table, Modal, Form, message } from 'antd';

import { getUserList, createUser, getRoleList, changeUser, removeUser } from '@/api';
import AddForm from '@/components/user/AddForm';
import { PAGE_SIZE } from '@/utils/constant';


const User = () => {
  const [ form ] = Form.useForm();
  const [{
    loading,
    modalLoading,
    roleList,
    userList,
    isModalVisible,
    user,
    selectUserId
  }, setState ] = useReducer((pre, next) => ({...pre, ...next}), {
    loading: true,
    modalLoading: false,
    roleList: [],
    userList: [],
    isModalVisible: false,
    user: {},
    selectUserId: '',
  });

  // 取得所有 role 名及 id 
  // 取得所有使用者資料
  let getUserArray = async() => {
    const roleList = await getRoleList();
    const userList = await getUserList();
    setState({userList, roleList, loading: false, isModalVisible: false})
  }

  useEffect(() => {
    getUserArray();
    return () => {
      getUserArray = null;
    }
  }, [])

  // 創建角色
  const addUser = () => {
    setState({ isModalVisible: true });
    form.validateFields()
    .then(async () => {
      const data = form.getFieldsValue(true);
      // 創建完後重新載入所有資料
      const { ok } = await createUser(data);
      if(ok){
        getUserArray();
      }
    })
    .catch(() => {
      message.error('驗證錯誤，請重新輸入')
    })
  }

  // 打開被點選的角色的 Modal
  const getUser = (record) => {
    const { id } = record;
    setState({ isModalVisible: true, selectUserId: id });
    form.setFieldsValue(record);
  }

  const updateUser = async () => {
    const data = form.getFieldsValue(true);
    console.log(data)
    const { ok } = await changeUser({ id: selectUserId, data });
    if(ok){
      // 關閉 Modal 並清空儲存選中的selectUserId的值
      setState({ isModalVisible: false, selectUserId: '' });
    }
  }

  // 刪除使用者
  const deleteUser = async(id) => {
    setState({ loading: true});
    const { ok } = await removeUser(id);
    if(ok){
      const newUsers = userList.filter(user => user.id !== id);
      setState({ userList: newUsers, loading: false});
      message.success('成功刪除。')
    }
    else {
      setState({ loading: false });
    }
  }

  // 更換 firestore 取得資料中的時間
  const transformTime = (time) => {
    return new Date(time).toLocaleString('zh-TW', {hour12: false}).replaceAll('/','-')
  }
  
  const columns = [
    {
      title: '用戶名',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: '郵箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '電話',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: '註冊時間',
      dataIndex: 'created_At',
      key: 'created_At',
      render:(text, record, index) => transformTime(record.created_At.seconds * 1000)
    },
    {
      title: '角色',
      dataIndex: 'roleId',
      key: 'roleId',
      render:(text) => {
        const role = roleList.find(r => r.id === text);
        return role.name
      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => getUser(record)}>修改</Button>
          <Button type="primary" onClick={() => deleteUser(record.id)}>刪除</Button>
        </Space>
      )
    },
  ];

  return (
    <Card
    title={
      <Button type="primary" onClick={() =>{ setState({ isModalVisible: true }) }}>創建用戶</Button>
    }>
      <Table
      loading={loading}
      rowKey="id" dataSource={userList} columns={columns}
      pagination={{ pageSize: PAGE_SIZE}} />
      <Modal title={ selectUserId ? '修改用戶資料': '添加用戶'} destroyOnClose
        confirmLoading={modalLoading}
        visible={isModalVisible}
        onOk={ selectUserId ? updateUser : addUser }
        onCancel={() => { setState({ isModalVisible: false, selectUserId: ''}) }}
      >
        <AddForm form={form} roleList={roleList} />
      </Modal>
    </Card>
  )
}

export default User;
