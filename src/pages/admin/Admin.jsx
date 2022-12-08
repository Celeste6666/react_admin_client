import React, { useState ,useEffect, Fragment,  } from 'react';
import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, message } from 'antd';


import SideBar from '@/components/admin/SideBar';
import Header from '@/components/admin/Header';
import './Admin.less';

const { Footer, Sider, Content } = Layout;


message.config({
  // 限制在頁面上出現 message
  maxCount: 1,
})

export default function Admin() {
  return (
    <Fragment>
      <Layout className="admin" style={{minHeight: '100%'}}>
        <Sider>
          <SideBar/>
        </Sider>
        <Layout>
          <Header />
          <Content style={{ padding: '20px 30px'}}>
            <Outlet/>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Fragment>
  )
}
