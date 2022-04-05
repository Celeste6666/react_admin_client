/* reducer 的作用根據舊的 state 與 action 來生成新的 state 
  updateHeadTitle() 用來管理頁面中顯示所在頁的標題
*/
import { UPDATE_HEAD_TITLE } from '@/utils/constant';


const initialTitle = '首頁';

export default function updateHeadTitle(state = initialTitle, action){
  const { type, payload } = action;
  switch(type){
    case UPDATE_HEAD_TITLE:
      return payload;
    default:
      return state;
  }
}