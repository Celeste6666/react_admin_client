import React,{ Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

// 利用陣列讓 menu 的程式碼變得比較簡潔
import { menuList } from '@/config/menuList';
import { getStorage } from '@/utils/storageUtil';
import Logo from '@/assets/images/logo.png';
import './SideBar.less';

const {SubMenu, Item} = Menu;

const Sidebar = () => {
  const { pathname } = useLocation();
  const user = getStorage();

  // 創建標籤，透過參數解構賦值使程式碼變簡潔
  const createMenuItem = ({key, title, icon}) => {
    if(user.authority.includes(key)){
      return (
        <Item key={key} icon={icon}>
          <Link to={key}>{title}</Link>
        </Item>
      )
    }
  };
  // 創建子標籤，子標籤中的標籤可以透過createMenuItem()在去循環創建
  const createSubMenu = ({key, title, icon}) => (children) => (
    <SubMenu key={key} title={title} icon={icon}>
      {children.map(child=> createMenuItem(child))}
    </SubMenu>
  )

  const [selectedKey, updateSelectedKey] = useState('');
  const [openKey, updateOpenKey] = useState('');

  const findOpenKey = () => {
    menuList.forEach(menu => {
      // 如果 menu.key 的內容包含了 pathname 的內容，該 menu 就是被選中的 ==> 針對父物件
      if (pathname.includes(menu.key)){
        updateSelectedKey(menu.key);
      }
      // 判斷 pathname 是否包含子物件 key
      else if(!pathname.includes(menu.key) && menu.children) {
        menu.children.forEach(child => {
          if (pathname.includes(child.key)){
            updateOpenKey(menu.key);
            updateSelectedKey(child.key);
          }
        })
      }
    })
  }

  // 一次只打開一個子選單
  const onOpenKeyChange = (openKey)=>{
    const {length} = openKey;
    updateOpenKey(openKey[length-1])
  }

  useEffect(() => {
    findOpenKey();
  }, [pathname])

  return (
    <Fragment>
      <Link to="/home" className="logo">
        <img src={Logo} alt="" />
        <h1>後臺管理</h1>
      </Link>
      {/* selectedKeys : 可以依據值的不同去選不同的標籤*/}
      <Menu
        theme="dark"
        mode="inline"
        openKeys={[openKey]}
        selectedKeys={[selectedKey]}
        onOpenChange={onOpenKeyChange}
      >
        {/* 利用 menu.children 來判斷是否有子標籤 */}
        {
          menuList.map(menu => !menu.children ?
            createMenuItem(menu) :
            createSubMenu(menu)(menu.children))
        }
      </Menu>
    </Fragment>
  );
}

export default Sidebar;
