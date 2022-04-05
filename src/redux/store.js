/* redux 最關鍵的核心管理對象 store */
import { createStore, applyMiddleware } from 'redux';

// 要執行異步 redux，必須引入 redux-thunk
import thunk from 'redux-thunk';

// 使用 redux 的開發管理工具
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

// 向外暴露管理對象 store

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));