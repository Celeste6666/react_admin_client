import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import ProductSearch from '@/components/product/ProductSearch';
import ProductTable from '@/components/product/ProductTable';
import { getProductList } from '@/api';


const Product = () => {
  // 用 productId 來判斷目前是在商品總覽頁面(<ProductCard />)還是個別商品頁面(<Outlet/>)
  const { productId } = useParams();
  const Navigate = useNavigate();
  const [ form ] = Form.useForm();

  const [ loading, updateLoading ] = useState(true);
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

  // 取得指定頁面商品
  let getProductArray = async (pageNum = 1, pageSize = 5) => {
    const searchItem = form.getFieldsValue(true);
    const products = await getProductList(pageNum, pageSize, searchItem);
    updateProductList(products);
    updateLoading(false);
  }

  // 回到產品頁面
  const backToProduct = () => {
    Navigate('/product');
    getProductArray()
  }

  useEffect(() => {
    getProductArray()
    return () => {
      getProductArray = null;
    }
  }, [])

  return (
    <Card title={
      productId ?
      <Button type="text" icon={<ArrowLeftOutlined />} onClick={backToProduct}></Button> :
      <ProductSearch form={form} getSearchText={getProductArray} />}
      extra={
        productId ?
        '':
          <Link to="/product/addUpdate/newProduct"
          style={{color: 'white'}}>
            <Button type="primary" icon={<PlusOutlined /> } >
              添加商品
            </Button>
          </Link>
      }
    >
      {
        productId ?
        <Outlet /> :
        <ProductTable
        loading={loading}
        productList={productList}
        updateProductList={updateProductList} />
      }
    </Card>
  );
}

export default Product;
