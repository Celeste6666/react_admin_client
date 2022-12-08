/* redux 最關鍵的核心管理對象 store */
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// 要執行異步 redux，必須引入 redux-thunk
import thunk from 'redux-thunk';

// 使用 redux 的開發管理工具
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

// redux-persist的配置
const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducers)

// 向外暴露管理對象 store
let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
let persistor = persistStore(store)
export { store, persistor }
