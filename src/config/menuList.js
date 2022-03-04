import {
  HomeOutlined,
  AppstoreOutlined,
  ReconciliationOutlined,
  ShopOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';

export const menuList = [
  {
    title: '首頁',
    key: '/home',
    icon: <HomeOutlined />,
  },
  {
    title: '商品',
    key: '/products',
    icon: <AppstoreOutlined />,
    children: [
      {
        title: '品類管理',
        key: '/products/category',
        icon: <ReconciliationOutlined />,
      },
      {
        title: '商品管理',
        key: '/products/product',
        icon: <ShopOutlined />,
      }
    ]
  },
  {
    title: '用戶管理',
    key: '/user',
    icon: <UserAddOutlined />,
  },
  {
    title: '角色管理',
    key: '/role',
    icon: <UserSwitchOutlined />,
  },
  {
    title: '圖形圖表',
    key: '/charts',
    icon: <AppstoreOutlined />,
    children: [
      {
        title: '柱狀圖',
        key: '/charts/bar',
        icon: <BarChartOutlined />,
      },
      {
        title: '折線圖',
        key: '/charts/line',
        icon: <LineChartOutlined />,
      },
      {
        title: '圓餅圖',
        key: '/charts/pie',
        icon: <PieChartOutlined />,
      }
    ]
  }
]