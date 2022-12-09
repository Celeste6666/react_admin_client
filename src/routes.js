import { redirect } from 'react-router-dom';
import { store } from '@/redux/store';
import { updateCurrentUser } from '@/redux/actions';
import App from '@/App';
import Login from '@/pages/login/Login';
import Admin from '@/pages/admin/Admin';
import Home from '@/pages/home/Home';
import Product from '@/pages/product/Product';
import ProductItem from '@/pages/product/ProductItem';
import ProductAddUpdate from '@/pages/product/ProductAddUpdate';
import Category from '@/pages/category/Category';
import Role from '@/pages/role/Role';
import User from '@/pages/user/User';
import Pie from '@/pages/charts/Pie';
import Line from '@/pages/charts/Line';
import Bar from '@/pages/charts/Bar';

import { auth } from '@/api/firbaseInit';
import { onAuthStateChanged } from 'firebase/auth';
import { saveStorage, removeStorage } from '@/utils/storageUtil';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Admin />,
        // 驗證使用者登錄狀態
        loader: () => {
          if (store.getState
().currentUser === null) {
            removeStorage();
            return redirect('/login');
          }
          onAuthStateChanged(auth, (user) => {
            if (user) {
              saveStorage(user.accessToken);
            }
          });
          return null;
        },
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: 'category',
            element: <Category />,
          },
          {
            path: 'product',
            element: <Product />,
            children: [
              {
                path: ':productId',
                element: <ProductItem />,
              },
              {
                path: 'addUpdate/:productId',
                element: <ProductAddUpdate />,
              },
            ],
          },
          {
            path: 'role',
            element: <Role />,
          },
          {
            path: 'user',
            element: <User />,
          },
          {
            path: 'pie',
            element: <Pie />,
          },
          {
            path: 'line',
            element: <Line />,
          },
          {
            path: 'bar',
            element: <Bar />,
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
];
