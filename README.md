# 學習紀錄 Day01

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
