import React, { useState,useEffect } from 'react';
import { Card, Button, Table, Space, Message, Form } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';

import CategoryEditForm from '@/components/category/CategoryEditForm';
import CategoryAddModal from '@/components/category/CategoryAddModal';

import {
  getCategoryList,
  updateCategory,
  deleteCategory,
  addCategoryData,
} from '@/api';


const Category = () => {
  const [loading, updateLoading] = useState(true);
  // 用來添加表單內容用的表單
  const [form] = Form.useForm();

  const [title, updateTitle] = useState('一級分類列表');
  // 一級列表
  const [categoryList, updateCategoryList] = useState([{
    id: '0',
    name: ''
  }]);

  // 取得所有 Category
  let getCategoryArr = async () => {
    const categorys = await getCategoryList();
    updateCategoryList(categorys);
    updateLoading(false)
    return categorys;
  }
  
  useEffect(()=>{
    getCategoryArr();
    return () => {
      getCategoryArr = null;
    }
  }, [])


  // 二級列表
  const [subCategoryList, updateSubCategoryList] = useState(null);

  // 進入的列表的級別 一級=>category/二級=>parentId
  const [subCategoryParentId, updateSubCategoryParentId] = useState('category');

  // 回到一級列表
  const backToCategory = (e) => {
    e.preventDefault();
    updateSubCategoryParentId('category');
    updateTitle('一級分類列表');
    updateSubCategoryList(null);
  }

  // 取得並顯示二級列表subCategory
  const enterSubCategory = (e, record) => {
    e.preventDefault();
    const { name, subCategory, id } = record;
    const titleNode = (
      <span>
        <Button type="link" style={{padding: '0'}} onClick={backToCategory}>一級分類列表</Button>
        <ArrowRightOutlined style={{padding: '0 10px'}} />
        <span>{name}</span>
      </span>
    )
    updateTitle(titleNode);
    updateSubCategoryParentId(id);
    updateSubCategoryList(subCategory);
    updateLoading(false);
  }

  // 修改分類內容
  const [editing, updateEditing] = useState('');

  const editCategory = async (e, record) => {
    const { id, name } = record;
    e.preventDefault();
    // editing = true 編輯中，點擊儲存後更新資料
    // 取得表單的新內容
    if (editing === id) {
      const categoryNewName = form.getFieldValue('editingInputText');
      if (!categoryNewName || name === categoryNewName) {
        updateEditing('');
        return;
      }
      const res = await updateCategory({...record, newName: categoryNewName});
      // 判斷現在是否在二級分類
      if (subCategoryList === null && res.ok){
        // 一級
        const newCategory = categoryList.map(item => {
          if(item.id === id) {
            item.name = categoryNewName
          }
          return item
        })
        updateCategoryList(newCategory);
        updateEditing('');
      } else if (res.ok) {
        // 二級
        const newSubCategory = subCategoryList.map(item => {
          if(item.id === id) {
            item.name = categoryNewName
          }
          return item
        });
        updateSubCategoryList(newSubCategory);
        updateEditing('');
      } else {
        // 更新失敗
        Message.error('修改失敗，請重新嘗試！')
      }
    }
    // editing = false 編輯中，點擊修改後開始編輯
    else {
      updateEditing(id)
    }
  }


  // 刪除分類
  const removeCategory = async (e, record) => {
    e.preventDefault();
    const { id } = record;
    const res = await deleteCategory(record);
    if(res.ok && subCategoryList === null) {
      const newCategory = categoryList.filter(item => item.id !== id);
      updateCategoryList(newCategory);
    }
    else if (res.ok) {
      const newSubCategory = subCategoryList.filter(item => item.id !== id)
      updateSubCategoryList(newSubCategory);
    }
    else {
      Message.error('刪除失敗，請重新嘗試！')
    }
  }

  // 添加 category 或 subCategory
  // 顯示添加 Modal
  const [isModalVisible, updateModalVisible] = useState(false);

  const addCategoryItem = async () => {
    // 取得添加表單內的 newCategoryItemId, newCategoryItemName 的值
    const {newCategoryItemId, newCategoryItemName} = form.getFieldsValue(true);
    if(!newCategoryItemName){
      Message.error('分類名稱必須要輸入！')
      return
    }
    // 帶入表單內的值後執行添加
    const res = await addCategoryData({parentId: newCategoryItemId, name: newCategoryItemName});
    if(res.ok) {
      // 取得最新CategoryList的內容
      const categorys = await getCategoryArr();
      // 如果在二級且目前所在的二級parentId === 所選擇的二級的parentId
      if(subCategoryList !== null && subCategoryParentId === newCategoryItemId) {
        const newSubCategory = categorys.find(item => item.id === newCategoryItemId);
        updateSubCategoryList(newSubCategory.subCategory);
      }
      // 成功添加後，關閉 Modal 並將 form 表單內的資料設定為目前所在列表的 id
      updateModalVisible(false);
      form.setFieldsValue({
        newCategoryItemId: subCategoryParentId,
        newCategoryItemName: ''
      });
    }
  }

  const columns = [
    {
      title: '分類名稱',
      dataIndex: 'name', // 顯示對應數據的屬性名
      key: 'name',
      render: (text, record, index) => {
        return (
            editing === record.id ?
            <CategoryEditForm {...record}
            form={form} /> :
            <span>{text}</span>
          )
      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 300,
      key: 'operate',
      render: (text, record, index) => (
        <Space>
          <Button type="primary" onClick={(e) => editCategory(e, record)}>
            {editing === record.id ? '儲存': '修改分類'}
          </Button>
          {
            subCategoryList === null &&
            <Button
            type="primary"
            onClick={(e) => {
              updateLoading(true);
              enterSubCategory(e, record)}
            }>
              查看子分類
            </Button>
          }
          <Button type="primary" onClick={(e) => removeCategory(e, record)}>
            刪除
          </Button>
        </Space>
      )
    },
  ];

  return (
    <Card title={title}
    extra={
      <Button type="primary"
        icon={<PlusOutlined />}
        onClick={(e) => {
          // 點擊後將添加表單的值設為目前所在的列表id位置
          form.setFieldsValue({
            newCategoryItemId: subCategoryParentId,
            newCategoryItemName: ''
          });
          updateModalVisible(true)}}>
        添加
      </Button>
    }>
      <CategoryAddModal
        categoryList={categoryList}
        visible={isModalVisible}
        updateModalVisible={updateModalVisible}
        subCategoryParentId={subCategoryParentId}
        addCategoryItem={addCategoryItem}
        form={form} />
      <Table
        loading={loading}
        columns={columns}
        dataSource={subCategoryList === null ? categoryList : subCategoryList}
        bordered
        rowKey="id"
        pagination={{showQuickJumper: true, defaultPageSize: 5 }}
      />
  </Card>
  );
}

export default Category;
