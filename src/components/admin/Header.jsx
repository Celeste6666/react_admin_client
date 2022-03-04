import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';

import ajax from '@/api/ajax';
import { getGeolocation } from '@/api/openWeather';
import {menuList} from '@/config/menuList';
import './Header.less';

const Header = () => {
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
    description: '晴',
    icon: '01d',
    id: 0,
    main: ''
  })

  // 在 componentDidMount 的階段執行取得天氣狀況(只需要執行一次)並設定時間器
  useEffect(()=>{
    let getCurrentWeather = async () => {
      const currentWeather = await getGeolocation();
      updateWeather(currentWeather.weather[0]);
    }
    const timeId = setInterval(()=> updateTime(getTime()), 60000);
    return () => {
      // 記得清除 async function
      getCurrentWeather = null;
      clearInterval(timeId)
    }
  }, [])

  // 取得目前路由並得到目前所在頁面的 title
  const Location = useLocation()
  const [title, changeTitle] = useState('首頁')
  useEffect(()=>{
    const getCurrentTitle = () => {
      menuList.forEach(menu => {
        const {pathname} = Location;
        if(menu.key===pathname){
          changeTitle(menu.title)
          return
        }
        if(menu.children){
          menu.children.find(child=> child.key === pathname? changeTitle(child.title): '')
          return
        }
      })
    }
    getCurrentTitle()
  }, [Location])

  const Navigate=useNavigate();
  const signOut=(e)=>{
    e.preventDefault();
    Modal.confirm({
      content: '確定要登出嗎？',
      cancelText: '取消',
      okText: '確定',
      maskClosable: true,
      onOk(){
        ajax('/signout');
        Navigate('/login', { replace: true })
      },
    })
  }

    return (
    <div className="header">
      <div className="header-top">
        <span>歡迎, admin</span>
        <Button type="link" size="large" onClick={signOut}>退出</Button>
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
