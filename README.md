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

    1. CategoryAddModal 在一、二級列表切換時，並不會被卸載在重新加載。
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

- react-draft-wysiwyg 套件：富文本編輯器。
