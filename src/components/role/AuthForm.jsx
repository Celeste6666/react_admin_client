import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {  Form, Input, Tree  } from 'antd';

import { authList } from '@/config/authList'

const { Item } = Form;

const AuthForm = props => {
  const { role:{ name, authority }, setState } = props;


  const onCheck = (checkedKeys) => {
    setState({ checkedKeys })
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