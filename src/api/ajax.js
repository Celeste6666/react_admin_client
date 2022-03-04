import { auth } from './firbaseInit';
// Firebase 登入用
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { message } from 'antd';

import {saveStorage, removeStorage} from '@/utils/storageUtil'

// 通過在封裝一層new Promise() 並在執行後返回一個 resolve||reject
// 來告訴執行的函數處理驗證結果是成功或失敗
export default function ajax(route, value={}) {  
  return new Promise((resolve, reject) => {
    // 登入
    if(route === '/login'){
      const {username, password} = value;
      signInWithEmailAndPassword(auth, username, password)
      .then(res=>{
        saveStorage(res.user);
        resolve(res);
      })
      .catch(err=>{
        reject('失敗')
        message.error('用戶名或密碼錯誤，請重新輸入')
      })
    }
    // 創建使用者
    else if(route === '/register'){
      const {username, password} = value;
      createUserWithEmailAndPassword(auth, username, password)
      .then((res)=>{
        resolve(res.user)
      }).catch(() => {
        reject('失敗')
        message.error('用戶名或密碼不符合規定，請重新註冊')
      })
    }
    // 登出
    else if (route==='/signout'){
      signOut(auth).then(()=>{
        removeStorage()
      })
    }
  })  
}