網站參考：[https://celeste6666.github.io/react_admin_client/](https://celeste6666.github.io/react_admin_client/)。

# 更新紀錄

透過 React Router 提供的新方法，來做路由驗證，並使用路由表來讓頁面更加精簡。

# 技術使用

- react-create-app：專案管理。
- craco：覆蓋預設的 webpack.config.js，使 antd 可以自動按需加載樣式。
- react-router：路由器管理。
- antd：UI 組件庫。
- Firebase Auth：使用者資料庫。
- Firebase Firestore：商品、種類資料庫。
- Firebase Storage：儲存圖片用。

# 學習紀錄 01

- 使用 antd 處理樣式：

  - 按需加載：透過 craco 及 babel-plugin-import 來實現。

    1. 安裝 npm install @craco/craco babel-plugin-import --save。
    2. 創建 craco.config.js 文件(與 package.json 同層級)。
    3. 修正 package.json > scripts(用 craco 運行腳本)。

  - 改變樣式：因為 antd 是由 less 撰寫，所以可以透過 less-loader 來 覆蓋變量，但在這變為了能夠直接覆蓋 react 中預設的配置文件，所以透過 craco-less 來實現自訂義樣式(craco.config.js>plugins 中設置)。

- 使用 react-router 創建路由:

  1. 下載 npm i react-router-dom。
  2. 在入口文件中引入 react-router-dom>BrowserRouter 並包裹<App />。
  3. 在 App.jsx 中引入 react-router-dom>Routes>Route，Route 標籤就是用來寫路由器。

- 使用 antd 來初始化及驗證表單：
  1. 必須注意到 antd 的表單送出數據驗證成功事件回調是 onFinish={} 不是 onSubmit，如果表單送出後數據驗證失敗的事件回調為 onFinishFailed={}。
  2. 可以通過 antd 提供的預設 rules 來寫，也可以通過自定義的 validator 來改寫驗證規則。

# 學習紀錄 02

- 封裝 AJAX 所有請求：

  - 使用 Firebase Auth 驗證登錄訊息。

- 通過封裝非同步的程式碼來統一管理執行非同步的方法。

- 當使用 class Component 在登錄成功後，無法進行跳轉，目前在 react-router 官網中只找到使用 useNavigate() 的 Hook 來進行成功跳轉畫面。

- 在 admin 頁面時，必須設置一道檢驗是否成功登入的關卡，如果使用者資訊不正確，就會自動跳轉到登入頁面。

- 如果有使用 async function 時，必須清空，否則會出錯。
  - class component: ，必須在 componentUnmount 時記得清空，以免洩漏內存。
  - 在 function component 時，在 useEffect() 在 return 一個 fn 中清空。
  - 透過賦予 async function 一個變量名，在銷毀階段時，將 null 賦值給這個變量。

# 學習紀錄 03

- 品類管理資料庫設計(Firestore)：
  ```
            |          |- name
            |-- 類A ---|- id: TimeStamop
            |          |- subCategory - 二級分類
  category--|
            |          |- name
            |-- 類B ---|- id: TimeStamop
            |          |- subCategory: undefined - 二級分類
            |
            |- 一級分類
  ```

透過判斷 state 中 subCategory 是否為 null (在跳轉到一級列表時，清空 state 中 subCategory ，所以該值會是 null)，來決定畫面顯示的是一級還是二級分類，而非透過路由的變動。

- 在使用 antd 的 <Select /> 時，無法在 <Modal /> 取消時，連動 <Select /> 預設值。

  - 問題：

    1. CategoryAddModal 在一、二級列表切換時，並不會被卸載在重新加載。 --- 解決方案 2 請參考 學習紀錄 05。
    2. form.resetFields() 會重新掛載 <Form/> 並將 values 還原到初始值。
    3. useState() 是個異步函數。

  - 解決：

    從二級列表切換回一級列表時，去執行 updateSubCategoryParentId('category') 後，subCategoryParentId 的值並不會立即修改(在 reder 後才會確定修改完成)，所以在 CategoryAddModal 中被傳入的 subCategoryParentId 值還是原本的值(如 '2vGoGNxNiXia9qpwENYA')，所以此時去執行 form.resetFields() 並沒有任何意義，因為 CategoryAddModal --> Form --> initialValues 的值還是原本的 '2vGoGNxNiXia9qpwENYA' ，而不是新的 'category'。

    在執行執行 updateSubCategoryParentId('category') 後，點擊添加按鈕後，再去執行 form.resetFields() ， CategoryAddModal 中被傳入的 subCategoryParentId 值的確是變動了，但卻無法作用(不清楚原因，因為在 Modal 中取消按鈕中可以正常運作的)。

    既然無法使用 form.resetFields() 去讓表單恢復初始值，那就透過 from.setFieldsValue({...}) 來動態的直接改變 form 表單欄位中的值，讓該表單的內容變成參數設定值。

    antd 中註明 "你不应该用 setState，可以使用 form.setFieldsValue 来动态改变表单值"。

# 學習紀錄 04

- 商品管理資料庫設計(Firestore)：

  ```
            |           |- name
            |-- 商品 A -|- id: Firestore Id
            |           |- detail
            |           |- description
            |           |- categoryParentId
  product --|           |- categoryId
            |           |- picture
            |           |- price
            |           |- status
            |
            |
            |- 商品總覽   |- 個別商品項目內容
  ```

- 想讓在相同樣式的按鈕其中一個可以在特定時刻顯示 loading 狀態，此時不可以單純將 loading 設為 true ，這樣會變成所有按鈕都會呈現 loading 喔！
  透過設置一個 loading 狀態，並將該 loading 的值設為要呈現 loading 的 id ，最後通過比較該 loading 的值是否與該按鈕自帶的 id 值相等，來決定是哪個按鈕處於 loading 。

- react-draft-wysiwyg 套件(what you what yot get)：富文本編輯器。

- React 中為 DOM 提供一個專門的屬性 `dangerouslySetInnerHTML` ，用來替換 innerHTML 的功能。
  <span dangerouslySetInnerHTML={{__html: detail}}></span>
  `dangerouslySetInnerHTML` 接收的值為一個屬性 `__html: 值` 的物件。

# 學習紀錄 05

```
          |           |- name
          |-- 角色 A -|- id: Firestore Id
   role --|           |- authority: [] (權限)
          |           |- authorizer (開啟權限的人)
          |           |- authorization_At
          |           |- created_At
          |
          |
          |- 角色總覽   |- 個別角色內容
```

- antd Modal 中有一個屬性 destroyOnClose 可以在 Modal 被關閉時銷毀 Modal 裡的子元素，如此在重新開啟時就會使 Modal 中的元素被重新渲染而使用 defaultXXX 的預設值。

- <Modal /> 和 Form 一起配合使用时，设置 destroyOnClose 也不会在 Modal 关闭时销毁表单字段数据，需要设置 <Form preserve={false} />。

# 學習紀錄 06

在 React 中多次調用 useState() 去更改 state 的值，但也因此會去多次渲染頁面(調用一次 useState() 的更新資料就會重新渲染畫面。)

解決方法： [使用 useState 多次渲染问题](https://juejin.cn/post/7042319659881742343)、[React Hooks useEffect 多个依赖批量操作](https://juejin.cn/post/6994085055559630879)。

# 學習紀錄 07

在 React Functional Component 中使用 redux ：

1. 透過 react-redux 套件使 React 專案可以更方便快速的使用 redux 。
2. 在入口文件(index.js)中透過 react-redux 的 <Provider store={使用的store}> 標籤將設置的 store 注入到專案中。
3. 必須注意在完成第二步後，在 UI 模組中還不能直接使用 store 中的 state，必須透過 react-redux 的 connect(mapStateToProps,mapDispatchToProps)(UI 模組) 來讓 UI 模組能夠與 store 互通有無。
4. 在模組中要取得 state 或 dispatch 都要通過各模組的 props 取得。

關於 redux ：

1. 在 redux 中的各個 reducer 通過 redux 的 combineReducers({ state 名: 對應的 reducer}) 結合。
2. 透過 redux 的 createStore(reducers) 創建一個狀態管理庫(reducers 指的是第一步的 combineReducers)。
3. 如果會用到異步 action 必須另外下載套件 redux-thunk，並透過 redux 中的 applyMiddleWare(thunk) 來讓該 store 使用 thunk ==> createStore(reducers, applyMiddleWare(thunk))
4. 如果需要 redux 的工具管理要另外下載套件 redux-devtools-extension，並使用其中的 composeWithDevTools 來讓瀏覽器可以實時觀察 redux 變化 ==> createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

# 學習紀錄 08

在構建完專案( `npm run build` )並部屬到 GitHub Pages 上後，發現並無法正確打開網頁，以下幾點是解決方法：

- 構建完的專案 .js 跟 .css 檔案路徑錯誤：
  在仔細觀察後發現是在讀取 .js 跟 .css 檔案時發現錯誤了。
  在構建後，會發現引入的 .js 跟 .css 檔案，都是以 `/static/...css|js`，但在頁面中打開會發現引入的路徑為 `https://celeste6666.github.io/static/...css|js`，但正確路徑應該要為 `https://celeste6666.github.io/react_admin_client/static/...css|js` 才對，所以可以透過在 package.json 中加入 `homepage` 屬性來幫助檔案得到正確連接路徑。

  [【小技巧】package.json 中 homepage 属性的作用](https://segmentfault.com/a/1190000021875558)。

  [GitHub Pages](https://create-react-app.dev/docs/deployment/#github-pages)

  - 打開網頁發現是是空白畫面：
    1. 在 /public 中新增 404.html。
    2. 在 /public/index.html 中一段程式碼 ↓
    ```
    <!-- Start Single Page Apps for GitHub Pages -->
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // MIT License
      // https://github.com/rafgraph/spa-github-pages
      // This script checks to see if a redirect is present in the query string,
      // converts it back into the correct url and adds it to the
      // browser's history using window.history.replaceState(...),
      // which won't cause the browser to attempt to load the new url.
      // When the single page app is loaded further down in this file,
      // the correct url will be waiting in the browser's history for
      // the single page app to route accordingly.
      (function (l) {
        if (l.search[1] === '/') {
          var decoded = l.search
            .slice(1)
            .split('&')
            .map(function (s) {
              return s.replace(/~and~/g, '&');
            })
            .join('?');
          window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
        }
      })(window.location);
    </script>
    <!-- End Single Page Apps for GitHub Pages -->
    ```

  3. 在 /src/index.js 中 React Router 的 BrowserRouter 標籤必須加入 `basename="/github-repoName"` 屬性。
     `<BrowserRouter basename="/react_admin_client">...</BrowserRouter>`

  [spa-github-pages](https://github.com/rafgraph/spa-github-pages)
