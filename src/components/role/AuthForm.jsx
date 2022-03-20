import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {  Form, Input, Tree  } from 'antd';

import { authList } from '@/config/authList'

const { Item } = Form;

const treeData = [
  {
    title: '平台權限',
    key: '/all',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: (
              <span
                style={{
                  color: '#1890ff',
                }}
              >
                sss
              </span>
            ),
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
];

const AuthForm = props => {
  const { role:{ name, authority }, updateCheckedKeys } = props;


  const onCheck = (checkedKeys) => {
    updateCheckedKeys(checkedKeys);
  };

  return (
    <Form>
      <Item label="角色名稱">
        <Input disabled value={name} />
      </Item>
      <Tree
      checkable
      treeData={authList}
      defaultExpandedKeys={['/products', '/charts']}
      defaultCheckedKeys={authority}
      onCheck={onCheck}
    />
    </Form>
  )
};

AuthForm.propTypes = {
  role: PropTypes.object.isRequired,
}

export default AuthForm;