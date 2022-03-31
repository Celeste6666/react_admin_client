import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';

import { signOut, getWeather } from '@/api';
import { getStorage } from '@/utils/storageUtil.js';
import {menuList} from '@/config/menuList';
import './Header.less';

const Header = () => {
  const [ user, updateUser ] = useState({ displayName: ''})
  // 取得目前時間
  const timeOptions = {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }
  const getTime = () => new Date().toLocaleString('zh-tw', timeOptions).replaceAll('/','-')
  const [time, updateTime] = useState(getTime())

  // 取得目前所處地點的天氣狀況
  const [weather, updateWeather] = useState({
    description: '雨',
    icon: '01d',
    id: 0,
    main: ''
  })

  // 在 componentDidMount 的階段執行取得天氣狀況(只需要執行一次)並設定時間器
  useEffect(()=>{
    let getCurrentWeather = async () => {
      const currentWeather = await getWeather();
      updateWeather(currentWeather.weather[0]);
    }
    getCurrentWeather()
    const timeId = setInterval(()=> updateTime(getTime()), 60000);
    return () => {
      // 記得清除 async function
      getCurrentWeather = null;
      clearInterval(timeId)
    }
  }, [])

  useEffect(()=>{
    const user = getStorage();
    updateUser(user)
  }, [])

  // 取得目前路由並得到目前所在頁面的 title
  const Location = useLocation()
  const [title, updateTitle] = useState('首頁')
  useEffect(()=>{
    const getCurrentTitle = () => {
      menuList.forEach(menu => {
        const {pathname} = Location;
        if(menu.key===pathname){
          updateTitle(menu.title)
          return
        }
        if(menu.children){
          menu.children.find(child=> child.key === pathname? updateTitle(child.title): '')
          return
        }
      })
    }
    getCurrentTitle()
  }, [Location])

  const Navigate = useNavigate();
  const logOut=(e)=>{
    e.preventDefault();
    Modal.confirm({
      content: '確定要登出嗎？',
      cancelText: '取消',
      okText: '確定',
      maskClosable: true,
      onOk(){
        signOut();
        Navigate('/login', { replace: true })
      },
    })
  }

    return (
    <div className="header">
      <div className="header-top">
        <span>歡迎, { user.displayName }</span>
        <Button type="link" size="large" onClick={logOut}>退出</Button>
      </div>
      <hr />
      <div className="header-bottom">
        <span className="header-bottom-navTab">{title}</span>
        <div className="header-bottom-time">
          <span>
            {time}
          </span>
          <img
          src={`http://openweathermap.org/img/w/${weather.icon}.png`}
          alt={weather.description} />
          <span>{weather.description}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
