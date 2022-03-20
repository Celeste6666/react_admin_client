import React from 'react';
import { Input, Form, Select, Button } from 'antd';

const { Item } = Form;
const { Option } = Select;

const ProductSearch = (props) => {
  const { form, getSearchText } = props;
  return (
  <Form
    form={form}
    layout="inline"
    initialValues={{
      type: "category",
      content: ''
    }}
    onFinish={() => { getSearchText() }}
  >
    <Item name="type">
      <Select>
        <Option value="name" disabled>按名稱搜尋</Option>
        <Option value="category">按類別搜尋</Option>
      </Select>
    </Item>
    <Item name="content">
      <Input type="text" placeholder="關鍵字" />
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
