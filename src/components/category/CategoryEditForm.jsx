import React from 'react';
import {  Input, Form } from 'antd';

const CategoryEditForm = (props) => {
  const { name, getNewCategoryName } = props;

  return (
    <Form.Item
      style={{ margin: 0 }}
      rules={[
        {
          required: true,
          message: `請重新輸入`,
        },
      ]}
    >
      <Input defaultValue={name} onChange={(e) => getNewCategoryName(e.target.value)} />
    </Form.Item>
  );
}

export default CategoryEditForm;
