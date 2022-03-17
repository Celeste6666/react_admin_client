import { auth, db, storage } from './firbaseInit';
// Firebase 登入用
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

// 讀取、添加數據
import {
  doc,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  Timestamp,
  startAt,
  limit,
  getDoc,
  where
} from 'firebase/firestore';

// 上傳圖片
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { message } from 'antd';

import {saveStorage, removeStorage} from '@/utils/storageUtil'

// 通過在封裝一層new Promise() 並在執行後返回一個 resolve||reject
// 來告訴執行的函數處理驗證結果是成功或失敗
export default function ajax(route, value={}) {
  return new Promise((resolve, reject) => {
    // 登入
    if(route === '/login') {
      const {username, password} = value;
      signInWithEmailAndPassword(auth, username, password)
      .then(res=>{
        saveStorage(res.user);
        resolve(res);
      })
      .catch(err=>{
        reject('登入失敗')
        message.error('用戶名或密碼錯誤，請重新輸入')
      })
    }
    // 創建使用者
    else if(route === '/register') {
      const {username, password} = value;
      createUserWithEmailAndPassword(auth, username, password)
      .then((res)=>{
        resolve(res.user)
      }).catch(() => {
        reject('失敗')
        message.error('用戶名或密碼不符合規定，請重新註冊')
      })
    }
    // 登出
    else if (route === '/signout') {
      signOut(auth)
      .then(()=>{
        removeStorage()
      })
      .catch(()=> {
        reject('登出失敗')
        message.error('登出失敗，請重新登出。')
      })
    }
    // 取得一級 category 資料
    else if (route === '/category/get') {
      getDocs(query(collection(db, 'category'), orderBy('name')))
      .then(querySnapshot => {
        let categoryList = [];
        querySnapshot.forEach(doc => {
          const { id } = doc;
          const { name, subCategory } = doc.data()
          categoryList = [...categoryList, {id, name, subCategory}]
        })
        resolve(categoryList);
      })
      .catch(err => {
        reject('獲取資料失敗。')
        message.error('獲取資料失敗，請刷新頁面。')
      })
    }
    // 修改 category 分類名
    else if (route === '/category/update') {
      const { id, name, parentId, newName } = value
      if(parentId) {
        // 二級分類修改
        updateDoc(doc(db, 'category', parentId), {
          subCategory: arrayRemove({ id, name, parentId }),
        })
        .then(() => {
          updateDoc(doc(db, 'category', parentId), {
            subCategory: arrayUnion({ id, name: newName, parentId }),
          })
        })
        .then(()=>{
          resolve({ok: true})
        })
        .catch((err)=>{
          reject('修改失敗，請重新嘗試')
        })
      }
      else {
        // 一級分類名修改
        updateDoc(doc(db, 'category', id), {
          name: newName,
        })
        .then(()=>{
          resolve({ok: true})
        })
        .catch((err)=>{
          reject('修改失敗，請重新嘗試')
        })
      }
    }
    // 刪除 category 分類
    else if (route === '/category/delete') {
      const { id, name, parentId } = value;
      if(parentId) {
        // 二級分類刪除
        updateDoc(doc(db, 'category', parentId), {
          subCategory: arrayRemove({ id, name, parentId }),
        })
        .then(()=>{
          resolve({ok: true});
        })
        .catch((err)=>{
          reject('刪除失敗，請重新嘗試');
        })
      }
      else {
        // 一級分類名修改
        deleteDoc(doc(db, 'category', id))
        .then(()=>{
          resolve({ok: true});
        })
        .catch((err)=>{
          reject('修改失敗，請重新嘗試');
        })
      }
    }
    // 添加 category 資料
    else if (route === '/category/add') {
      const {name, parentId} = value;
      if(parentId !== 'category'){
        // 二級添加
        updateDoc(doc(db, 'category', parentId), {
          subCategory: arrayUnion(
            {
              id: Timestamp.fromDate(new Date()),
              name,
              parentId
            }
          )
        })
        .then(() => {
          resolve({ok: true});
        })
      }
      else {
        // 一級添加
        addDoc(collection(db, 'category'), {
          name,
          subCategory: [],
        })
        .then(() => {
          resolve({ok: true});
        })
      }
    }
    // 取得 product 資料(當前頁面決定顯示資料)
    else if(route === '/product') {
      const { pageNum, PageSize, searchItem } = value;
      const { type, content } = searchItem;

      const docRef = content && type === 'name' ?
      query(collection(db, 'product'), where(type, '>=', content), where(type, '<=', content + '/uf8ff'), orderBy('name'),startAt((pageNum - 1) * PageSize), limit(PageSize)) :
      content && type === 'category' ? query(collection(db, 'product'), where(type, 'array-contains', content), orderBy('name'),startAt((pageNum - 1) * PageSize), limit(PageSize)) :
      query(collection(db, 'product'), orderBy('name'),startAt((pageNum - 1) * PageSize), limit(PageSize));
console.log(docRef)
      getDocs(docRef)
      .then(snapshot => {
        let productList = [];
        snapshot.forEach(doc => {
          const { id } = doc;
          productList = [...productList, { id, ...doc.data() }]
        })
console.log(snapshot)
        resolve(productList);
      }).catch((error) => {
        console.log(error)
        message.error('無法取得商品資料，請刷新頁面。')
      })
    }
    // 改變 product status
    else if(route === '/product/status') {
      const { id, status } = value;
      updateDoc(doc(db, 'product', id), {
        "status": status,
      })
      .then(()  => {
        resolve({ok: true})
      }).catch(() => {
        message.error('無法更新，請重新嘗試。')
      })
    }
    // 上傳圖片並取得圖片位址
    else if(route === '/product/pictureUpload') {
      const { name } = value;
      const storageRef = ref(storage, name);
      uploadBytes(storageRef, value)
        .then((snapshot) => {
          const { bucket, fullPath } = snapshot.metadata;
          // 要先 return 一個 Promise 才可以用 then 接收
          return getDownloadURL(ref(storage, `gs://${bucket}/${fullPath}`))
        })
        .then(url => {
          resolve(url);
        })
        .catch(err=> console.log(err))
    }
    // 刪除圖片
    else if(route === '/product/pictureRemove') {
      deleteObject(ref(storage, value)).then(() => {
        resolve({ ok: true });
        message.success('成功刪除圖片！')
      })
    }
    // 添加 product 資料(當前頁面決定顯示資料)
    else if(route === '/product/add') {
      addDoc(collection(db, 'product'), value)
        .then((docRef) => {
          resolve({ok: true, id: docRef.id});
        })
        .catch(() => {
        message.error('出現錯誤，請刷新頁面。')
      })
    }
    // 查看單一商品
    else if(route === '/product/single') {
      getDoc(doc(db, 'product', value))
        .then(doc => {
          resolve(doc.data())
        })
    }
    // 修改商品內容
    else if(route === '/product/single/update') {
      const { id, data } = value
      updateDoc(doc(db, 'product', id), data)
        .then(() => {
          resolve({ ok: true })
        })
    }
  })
}