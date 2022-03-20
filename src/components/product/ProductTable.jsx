import React, { Fragment, useState, useEffect } from 'react';
import { Link  } from 'react-router-dom';
import { Table, Button, Space } from 'antd';
import { changeProductStatus } from '@/api';
import { PAGE_SIZE } from '@/utils/constant';

const ProductTable = props => {
  const { loading, productList, updateProductList } = props;
  const [ btnLoading, updateBtnLoading ] = useState('');

  const changeStatus = async (data) => {
    const { id, status } = data;
    updateBtnLoading(id);
    const res =  await changeProductStatus({id, status: !status});
    if(res.ok) {
    const newList = productList.map(product => {
      if(product.id === id) {
        product.status = !status
      }
      return product
    });
    updateProductList(newList);
    updateBtnLoading('');
    }
  }


  const columns = [
    {
      title: '商品名稱',
      width: '20%',
      dataIndex: 'name',
    },
    {
      title: '商品描述',
      width: '45%',
      dataIndex: 'description',
    },
    {
      title: '價格',
      dataIndex: 'price',
    },
    {
      title: '狀態',
      width: '13%',
      dataIndex: 'status',
      render: (text,record) => {
        const { status } = record;
        return (
        <Fragment>
          <Button
            type="primary"
            status={status? 1 : 0}
            loading={btnLoading && btnLoading === record.id}
            onClick={() => changeStatus(record)}
          >
            {status ?  '下架' : '上架'}
          </Button>
          <p>{status ? '出售中' : '已下架'}</p>
        </Fragment>
      )
      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: (text, record) => (
        <Space direction="vertical">
          <Link to={`/product/${record.id}`}>
            商品詳情
          </Link>
          <Link to={`/product/addUpdate/${record.id}`}>
            修改
          </Link>
        </Space>),
    },
  ];

  return (
    productList ?
    <Table dataSource={productList} columns={columns} rowKey="id" pagination={{ pageSize: PAGE_SIZE,  }} loading={loading} /> : ''
  )
}

export default ProductTable