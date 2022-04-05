/*
向外暴露一個所有 reducer 合併後產生的 reducers，
所有 reducer 合併後，會返回一個合併 state (初始化後會產生函數中的預設值)
*/
import { combineReducers } from 'redux';
import headTitle from './headTitle';
import currentUser from './user';

export default combineReducers({
  headTitle,
  currentUser
})