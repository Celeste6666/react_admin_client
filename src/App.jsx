// 根模組
import React, { Component } from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from '@/pages/login/Login';
import Admin from '@/pages/admin/Admin';
import Home from '@/pages/home/Home';
import Product from '@/pages/product/Product';
import ProductItem from '@/pages/product/ProductItem';
import ProductAddUpdate from '@/pages/product/ProductAddUpdate';
import Category from '@/pages/category/Category';
import Role from '@/pages/role/Role';
import User from '@/pages/user/User';
import Pie from '@/pages/charts/Pie';
import Line from '@/pages/charts/Line';
import Bar from '@/pages/charts/Bar';


export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Admin/>} >
          <Route path="home" element={<Home />}></Route>
          <Route path="category" element={<Category />}></Route>
          <Route path="product" element={<Product />}>
            <Route path=":productId" element={<ProductItem />}></Route>
            <Route path="addUpdate/:productId" element={<ProductAddUpdate />}></Route>
          </Route>
          <Route path="role" element={<Role />}></Route>
          <Route path="user" element={<User />}></Route>
          <Route path="pie" element={<Pie />}></Route>
          <Route path="line" element={<Line />}></Route>
          <Route path="bar" element={<Bar />}></Route>
        </Route>
        <Route path="/login" element={<Login/>} ></Route>
      </Routes>
    )
  }
}
