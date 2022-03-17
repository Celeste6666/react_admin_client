import React, { Fragment, useState, useEffect } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { removeProductPicture } from '@/api'

const ProductUpload = props => {
  const { fileList, updateFileList } = props;

  // 添加圖片
  const addFile = ({file}) => {
    if(file){
      const { uid, name } = file;
      const url = URL.createObjectURL(file);
      if(url) {
        updateFileList([...fileList, {
          uid,
          name,
          status: 'done',
          url,
          file
        }])
      }
    } else {
      message.error('該圖片上傳有誤，請重新上傳！');
    }
  }

  // 刪除圖片
  const updateNewFile = (removedFile) => {
    const newFileList = fileList.filter(file => file.uid !== removedFile.uid);
    updateFileList(newFileList);
  }

  const onRemove = async(removedFile) => {
    // 要手動清除，避免佔用內存
    URL.revokeObjectURL(removedFile.url);
    // 透過 file 判斷是否為已經存入 storage 中的圖片
    if (!removedFile.file) {
      const res = await removeProductPicture(removedFile.name);
      if(res.ok) {
        updateNewFile(removedFile);
      }
    }
    // 如果該圖片還沒上傳到 storage 就直接刪除
    else {
      updateNewFile(removedFile);
    }
  }

  // 觀看圖片
  const [preview, updatePreview] = useState({
    visible: false,
    title: '',
  })

  const [previewImage, updatePreviewImage] = useState('')

  const onPreview = (file) => {
    const { name, url } = file;
    updatePreview({visible: true, title: name});
    updatePreviewImage(url);
  }

  return (
    <Fragment>
      <Upload
      accept="image/*"
      listType="picture-card"
      fileList={fileList}
      customRequest={addFile}
      onRemove={onRemove}
      onPreview={onPreview}>
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
      <Modal
        {...preview}
        footer={null}
        onCancel={()=> {updatePreview({visible: false, title: ''});
                        updatePreviewImage('');}}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Fragment>
  )
}

export default ProductUpload