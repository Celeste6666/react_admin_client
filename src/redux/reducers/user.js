// 用來管理目前用戶資料
import { getStorage, saveStorage } from '@/utils/storageUtil';
import { UPDATE_CURRENT_USER } from '@/utils/constant';


// 取得現在登入的使用者資料
const initialTitle = getStorage();

export default function currentUser(state = initialTitle, action){
  const { type, payload } = action;
  switch(type){
    case UPDATE_CURRENT_USER:
      saveStorage(payload);
      return payload;
    default:
      return state;
  }
}