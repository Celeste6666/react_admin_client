import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams  } from 'react-router-dom';
import { Card, Form, Button } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import { getProductList } from '@/api';
import ProductSearch from '@/components/product/ProductSearch';
import ProductTable from '@/components/product/ProductTable';


const Product = () => {
  // 用 productId 來判斷目前是在商品總覽頁面(<ProductCard />)還是個別商品頁面(<Outlet/>)
  const { productId } = useParams();

  const [ loading, updateLoading ] = useState(true);
  const [ form ] = Form.useForm();
  const [ productList, updateProductList ] = useState([{
    id: '',
    categoryId: '',
    categoryParentId: '',
    description: '',
    detail: '',
    name: '三星手機',
    picture: '',
    price: 299,
    status: false,
  }]);

  let getProductArray = async () => {
    const products = await getProductList();
    updateProductList(products);
    updateLoading(false);
  }

  useEffect(() => {
    getProductArray()
    return () => {
      getProductArray = null
    }
  }, [])


  return (
    <Card title={ productId ?
      <Button type="text" icon={<ArrowLeftOutlined />}></Button> :
      <ProductSearch form={form} />}
      extra={
          productId ?
          '':
          <Button>
          <Link type="primary" to={`/products/product/addUpdate/newProduct`}
            icon={<PlusOutlined />}>
              添加商品
          </Link>
        </Button>
      }
    >
      {
        productId ?
        <Outlet/> :
        <ProductTable
        productList={productList}
        loading={loading}
        updateProductList={updateProductList}
        />
      }
    </Card>
  );
}

export default Product;
