import React from 'react';
import { Input, Form } from 'antd';

const CategoryEditForm = (props) => {
  const { name, form } = props;

  return (
    <Form 
    form={form}>
      <Form.Item
        style={{ margin: 0 }}
        rules={[
          {
            required: true,
            message: `請重新輸入`,
          },
        ]}
      >
        <Input name="editingInputText" defaultValue={name} />
      </Form.Item>
    </Form>
  );
}

export default CategoryEditForm;
