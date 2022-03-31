import React, { useState ,useEffect, Fragment,  } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

import { Layout, message } from 'antd';

import { getStorage } from '@/utils/storageUtil.js'
import SideBar from '@/components/admin/SideBar';
import Header from '@/components/admin/Header';
import './Admin.less';

const { Footer, Sider, Content } = Layout;


message.config({
  // 限制在頁面上出現 message
  maxCount: 1,
})

function Admin() {
  const [ loading, updateLoading ] = useState(true);
  const user = getStorage();

  const Navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if(user && user.authority.includes(pathname)) {
      // 如果直接進入到 / 就會被重定向到 /home
      Navigate(pathname)
      updateLoading(false)
    }
    else if(user && !user.authority.includes(pathname)){
      Navigate(-1, { replace: true })
    }
    else {
      Navigate('/login', { replace: true })
    }
  }, [pathname]);

  return (
    <Fragment>
      {
      loading ?
      <div>Loading</div>:
      <Layout className="admin" style={{minHeight: '100%'}}>
        <Sider>
          <SideBar/>
        </Sider>
        <Layout>
          <Header />
          <Content style={{ padding: '20px 30px'}}>
            <Outlet/>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
      }
    </Fragment>
  )
}

export default Admin;
