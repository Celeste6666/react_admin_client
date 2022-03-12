import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Select,
  Cascader,
  InputNumber,
} from 'antd';

const { Item } = Form;

const ProductAddUpdate = props => {
  const { productId } = useParams();
  return (
    <Form>
      <Item name="name" label="商品名稱">
        <Input />
      </Item>
    </Form>
  )
}

export default ProductAddUpdate