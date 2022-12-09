// 用來管理目前用戶資料
import { getStorage } from '@/utils/storageUtil';
import { UPDATE_CURRENT_USER } from '@/utils/constant';


// 取得現在登入的使用者資料
// 這邊設定資料的原因是因為要讓刷新頁面後，不會進入 "/" 的 loader 判斷而導致返回到 "/login"
// 刷新頁面後，因為 redux-persist 的原因，所以使透過緩存取得的資料
const initialTitle = getStorage();

export default function currentUser(state = initialTitle, action){
  const { type, payload } = action;
  switch(type){
    case UPDATE_CURRENT_USER:
      return payload;
    default:
      return state;
  }
}