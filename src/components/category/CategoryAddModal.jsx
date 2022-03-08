import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Input } from 'antd';
const { Item } = Form;
const { Option } = Select;

const CategoryAddModal = (props) => {
  const {
    categoryList,
    visible,
    updateModalVisible,
    subCategoryParentId, // 目前所屬類別
    addCategoryItem,
    form
  } = props;

  return (
  <Modal title="添加分類"
  visible={visible}
  cancelText="取消"
  okText="確認"
  onCancel={() => {
    form.resetFields();
    updateModalVisible(false);
  }}
  onOk={() => addCategoryItem()}
  >
    <Form layout="vertical"
      form={form}
      initialValues={{
        newCategoryItemId: subCategoryParentId,
        newCategoryItemName: ''
    }}>
      <Item
      name="newCategoryItemId"
      label="所屬分類">
        <Select
          style={{ width: '100%' }}
          showSearch
          optionFilterProp="children"
          filterOption={true}
        >
          <Option value="category" key="category" >一級分類列表</Option>
          {
            categoryList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
          }
        </Select>
      </Item>
      <Item
        label="分類名稱"
        name="newCategoryItemName"
        rules={[{ required: true, message: '必須輸入分類名稱！' }]}
        >
        <Input />
      </Item>
    </Form>
  </Modal>
  );
}

export default CategoryAddModal;
