import React, { useState ,useEffect, Fragment,  } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

import { auth } from '@/api/firbaseInit';
import {
  onAuthStateChanged,
} from 'firebase/auth';

import {saveStorage, getStorage} from '@/utils/storageUtil';

import { Layout, message } from 'antd';

import SideBar from '@/components/admin/SideBar';
import Header from '@/components/admin/Header';
import './Admin.less';

const { Footer, Sider, Content } = Layout;


message.config({
  // 限制在頁面上出現 message
  maxCount: 1,
})

function Admin() {
  const [user, setUser] = useState(getStorage());
  const [loading, setLoading] = useState(true);

  const Navigate = useNavigate();
  const {pathname} =useLocation();
  useEffect(() => {
    // 如果直接進入到 / 就會被重定向到 /home
    if(pathname==='/') {
      Navigate('/home', { replace: true })
    }
    // 驗證使用者登錄狀態
    // 給 async 函數一個變量名以便清空。
    let vadiateUser = onAuthStateChanged(auth, (user)=>{
      if(!user){
        saveStorage(null);
        Navigate('/login', { replace: true })
      }else{
        saveStorage(user);
      }
      setUser(getStorage())
      setLoading(false)
    })
    return () => {
      // 清空 async ，否則可能造成內存洩漏
      vadiateUser = null;
      message.error('請重新登入');
    }
  }, []);

  return (
    <Fragment>
      {
      loading ?
      <div>Loading</div>:
      <Layout style={{height: '100%'}} className="admin">
        <Sider>
          <SideBar/>
        </Sider>
        <Layout>
          <Header />
          <Content>
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
