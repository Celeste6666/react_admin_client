import React from 'react';
import { Outlet, useParams  } from 'react-router-dom';
import ProductCard from '@/components/product/ProductCard';


const Product = () => {
  // 用 productId 來判斷目前是在商品總覽頁面(<ProductCard />)還是個別商品頁面(<Outlet/>)
  const {productId} = useParams();

  return (
    productId ? <Outlet/> : <ProductCard />
  );
}

export default Product;
