import React,{ Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'antd';

// 利用陣列讓 menu 的程式碼變得比較簡潔
import { menuList } from '@/config/menuList';
import { updateHeadTitle } from '@/redux/actions';
import Logo from '@/assets/images/logo.png';
import './SideBar.less';

const {SubMenu, Item} = Menu;

const Sidebar = ({currentUser: user, headTtitle, updateHeadTitle}) => {
  const { pathname } = useLocation();

  // 創建標籤，透過參數解構賦值使程式碼變簡潔
  const createMenuItem = ({key, title, icon}) => {
    if(user && user.authority.includes(key)){
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
    // connect(mapStateToProps, mapDispatchToProps)(UI 模組)，模組就可以透過props 取得 redux 資料
    // 透過監視 pathname 的更新來更改 store 的 HeadTitle 的值
    menuList.forEach(menu => {
      // 如果 pathname 的內容包含了 menu.key 的內容，該 menu 就是被選中的 ==> 針對父物件
      if (pathname.includes(menu.key)){
        updateSelectedKey(menu.key);
        updateHeadTitle(menu.title)
      }
      // 判斷 pathname 是否包含子物件 key
      else if(!pathname.includes(menu.key) && menu.children) {
        menu.children.forEach(child => {
          if (pathname.includes(child.key)){
            updateOpenKey(menu.key);
            updateHeadTitle(child.title)
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
      <Link to="/" className="logo">
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
export default connect(
  (state) => ({
    headTtitle: state.headTtitle,
    currentUser: state.currentUser
  }),
  {
    updateHeadTitle
  }
)(Sidebar);
