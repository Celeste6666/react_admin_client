import React from 'react';
import { Input, Form, Select, Button } from 'antd';

const { Item } = Form;
const { Option } = Select;

const ProductSearch = (props) => {
  const { form } = props;
  return (
  <Form
    form={form}
    layout="inline"
    initialValues={{
      price: {
        number: 0,
        currency: 'rmb',
      },
    }}
  >
    <Item
      name="search"
    >
      <Select
        defaultValue="name"
      >
        <Option value="name">按名稱搜尋</Option>
        <Option value="category">按類別搜尋</Option>
      </Select>
    </Item>
    <Item>
      <Input type="text"
        placeholder="關鍵字"
      />
    </Item>
    <Item>
      <Button type="primary" htmlType="submit">
        搜尋
      </Button>
    </Item>
  </Form>
  );
}

export default ProductSearch;
