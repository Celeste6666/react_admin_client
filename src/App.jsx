// 根模組
import React, { Component } from 'react';
import {Routes, Route} from 'react-router-dom';
import Admin from '@/pages/admin/Admin';
import Login from '@/pages/login/Login';

export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Admin/>} ></Route>
        <Route path="/login" element={<Login/>} ></Route>
      </Routes>
    )
  }
}
