export const authList = [
  {
    title: '平台權限',
    key: '/all',
    children: [
      {
        title: '首頁',
        key: '/',
        disabled: false,
      },
      {
        title: '商品',
        key: '/products',
        children: [
          {
            title: '品類管理',
            key: '/category',
          },
          {
            title: '商品管理',
            key: '/product',
          }
        ]
      },
      {
        title: '用戶管理',
        key: '/user',
        disabled: false,
      },
      {
        title: '角色管理',
        key: '/role',
        disabled: false,
      },
      {
        title: '圖形圖表',
        key: '/charts',
        children: [
          {
            title: '柱狀圖',
            key: '/bar',
          },
          {
            title: '折線圖',
            key: '/line',
          },
          {
            title: '圓餅圖',
            key: '/pie',
          }
        ]
      },
    ],
  },
];