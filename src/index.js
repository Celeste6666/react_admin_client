/* 入口文件 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from "@/routes";
import '@/index.less';

// basename 屬性會協助 router 以 /react_admin_client做url前綴做
const router = createBrowserRouter(routes, {
  basename:"/react_admin_client/"
});

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
)