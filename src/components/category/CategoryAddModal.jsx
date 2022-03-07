import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Input } from 'antd';
const { Item } = Form;
const { Option } = Select;

const CategoryAddModal = (props) => {
  const {
    categoryList,
    visible,
    updateModalVisible,
    subCategoryParentId,
    addCategoryItem
  } = props;
  
  
  const [inputText, updateInputText] = useState('');
  const [chosenId, updateChosenId] = useState('');
  const [form] = Form.useForm();

  useEffect(() =>{
    console.log('update')
    form.resetFields();
    return ()=>{
      updateModalVisible(false);
      console.log('unmount')
    }
  },[chosenId, subCategoryParentId])


  return (
  <Modal title="Add a New Category"
  visible={visible}
  cancelText="取消"
  okText="確認"
  onCancel={() => {
    console.log('cancel')
    form.resetFields();
    updateModalVisible(false);
  }}
  onOk={() => {
    addCategoryItem({parentId: chosenId, name: inputText });
    updateInputText('')}}
  >
    <Form layout="vertical" form={form}>
      <Item
      name="newCategoryItem"
      label="分類"
      rules={[{ required: true, message: '一定要填！' }]}>
        <Select
          style={{ width: '100%' }}
          defaultValue={subCategoryParentId}
          showSearch
          optionFilterProp="children"
          filterOption={true}
          onSelect={(value) => updateChosenId(value)}
        >
          <Option value="category" key="category" >一級分類列表</Option>
          {
            categoryList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
          }
        </Select>
      </Item>
      <Item
        label="新分類名"
        name="newCategoryItemName">
        <Input defaultValue="" onChange={(e)=>updateInputText(e.target.value)} />
      </Item>
    </Form>
  </Modal>
  );
}

export default CategoryAddModal;
