import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Cascader,
  message,
} from 'antd';

// 富文本編輯器轉換
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import {
  getCategoryList,
  addProduct,
  addProductPicture,
  getSingleProduct,
  updateSingleProduct,
} from '@/api';

import ProductUpload from '@/components/product/ProductUpload';
import ProductTextArea from '@/components/product/ProductTextArea';

const { Item } = Form;
const { TextArea } = Input;

const ProductAddUpdate = props => {
  const { productId } = useParams();

  const Navigate = useNavigate();
  const [ form ] = Form.useForm();

  const [ categoryOptions, updateCategoryOptions] = useState(null)

  // 取得所有商品種類
  let getCategoryOption = async() => {
    const categoryList = await getCategoryList();
    const newCategoryOptions = categoryList.map(category => {
      const { name, subCategory } = category;
      const newSubCategory = subCategory.map(sub => ({label: sub.name, value: sub.name }))
      return {
        label: name,
        value: name,
        children: newSubCategory
      }
    });
    updateCategoryOptions(newCategoryOptions);
  }

  // 取得並添加商品資料
  const [ fileList, updateFileList ] = useState([]);

  // 商品詳述內容
  const [ editorContent, updateEditorContent ] = useState(EditorState.createEmpty())

  // 上傳圖片
  const uploadPictures = async () => {
    // 將所有圖片上傳到 firebase，透過 Promise.all 讓非同步循環全部結束後才進行下一步判斷是更新還是添加
    const newFileList = await Promise.all(fileList.map(async(file) => {
      const { url, file: originFile  } = file;
      const newUrl = originFile ? await addProductPicture(originFile) : url;
      return {
        ...file,
        file: '',
        url: newUrl,
      };
    }))
    updateFileList(newFileList);
    return newFileList;
  }

  const onFinish = async (value) => {
    const newFileList = await uploadPictures();
    value.picture = newFileList;
    value.detail = draftToHtml(convertToRaw(editorContent.getCurrentContent()));
    console.log(value)
    // 編輯原有商品頁面
    if(productId !== 'newProduct'){
      const res = await updateSingleProduct({id: productId, data: value})
      if(res.ok){
        message.success('更新成功！');
      }
    }
    // 添加頁面
    else {
      value.status = false; // 預設都為未上架
      const { ok, id } = await addProduct(value);
      if(ok) {
        message.success('成功添加！')
        Navigate(`/product/addUpdate/${id}`)
      }
    }
  }

    let getProductFromId = async(id) => {
    // 如果是在產品修改頁面，就取得該產品基本資料
    if(id === 'newProduct') return;
    const product = await getSingleProduct(id);
    // 取得基本資料後，將值給予表單
    form.setFieldsValue(product);
    updateFileList(product.picture);

    const editorContent = product.detail ? htmlToDraft(product.detail) : '';
    if (editorContent) {
      const contentState = ContentState.createFromBlockArray(editorContent.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      updateEditorContent(editorState)
    }
  }

    useEffect(() => {
    getCategoryOption();
    getProductFromId(productId);
    return () => {
      getCategoryOption = null;
      getProductFromId = null;
    }
  }, [])


  return (
    <Form form={form} labelCol= {{ span: 3 }} wrapperCol= {{ span: 12}} labelAlign="left" onFinish={onFinish}>
      <Item name="name" label="商品名稱" rules={[
        {required: true, message: '商品名稱為必填！'}
      ]}>
        <Input />
      </Item>
      <Item name="description" label="商品描述" rules={[
        {required: true, message: '商品描述為必填！'}
      ]}>
        <TextArea rows={3} placeholder="請簡單描述該商品！" />
      </Item>
      <Item name="price" label="商品價格" rules={[
        {required: true, message: '商品價格為必填！'}
      ]}>
        <Input addonAfter="元"  />
      </Item>
      <Item name="category" label="商品分類" rules={[
        {required: true, message: '商品分類為必填！'}
      ]}>
        <Cascader options={categoryOptions} />
      </Item>
      <Item name="picture" label="商品照片" >
        <ProductUpload fileList={fileList} updateFileList={updateFileList} />
      </Item>
      <Item name="detail" label="商品詳述">
        <ProductTextArea editorContent={editorContent} updateEditorContent={updateEditorContent} />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          送出
        </Button>
      </Item>
    </Form>
  )
}

export default ProductAddUpdate