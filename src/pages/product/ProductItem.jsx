import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { convertFromHTML,  ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Spin, Typography, List } from 'antd';

import {
  getSingleProduct,
} from '@/api';
import './ProductItem.less';

const { Item } = List;
const { Title } = Typography;

const ProductItem = () => {
  const { productId } = useParams();
  const [ loading, updateLoading ] = useState(true)
  const [ product, updateProduct ] = useState({})
  
  let getProductFromId = async(id) => {
    const product = await getSingleProduct(id);
    updateProduct(product);
    updateLoading(false);
  }
  
  useEffect(() => {
    getProductFromId(productId);
    return () => {
      getProductFromId = null;
    }
  }, [])
  const { name, description, price, category, picture, detail } = product;
  return loading ? <Spin />: (
    <List split className="product-list">
      <Item>
        <Title level={5}>商品名稱：</Title>
        <span>{ name }</span>
      </Item>
      <Item>
        <Title level={5}>商品描述：</Title>
        <span>{ description }</span>
      </Item>
      <Item>
        <Title level={5}>商品價格：</Title>
        <span>{ price }</span>
      </Item>
      <Item>
        <Title level={5}>商品分類：</Title>
        <span>{ category.join(' → ') }</span>
      </Item>
      <Item>
        <Title level={5}>商品照片：</Title>
        {
          picture.map(pic => (<img key={pic.url} src={pic.url} />))
        }
      </Item>
      <Item>
        <Title level={5}>商品詳述：</Title>
        <span dangerouslySetInnerHTML={{__html: detail}}>
        </span>
      </Item>
    </List>
  );
}

export default ProductItem;
