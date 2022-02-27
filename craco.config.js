const {resolve} = require('path')
const CracoLessPlugin = require('craco-less');

module.exports = {
  babel: {
    plugins: [
      // 使用 babel-plugin-import 處理按需加載
      ['import',
        {
          // 需要按需加載的庫為 antd
          libraryName: 'antd',
          libraryDectory: 'es',
          // 自動打包相關樣式
          style: true
        }
      ]
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#159E9D'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      "@": resolve('./src')
    }
  }
};