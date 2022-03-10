import React from 'react';
import { Link  } from 'react-router-dom';
import { Card, Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import ProductSearch from './ProductSearch'

const ProductCard = () => {
  const [form] = Form.useForm();
  return (
    <Card title={<ProductSearch form={form} />}
      extra={
        <Button type="primary"
          icon={<PlusOutlined />}>
          添加商品
        </Button>}
    >
    
      <Link to="/products/product/ujgu" className="logo">
        商品連結
      </Link>
    </Card>
  );
}

export default ProductCard;
