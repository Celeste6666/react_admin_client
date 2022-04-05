import ajax from './ajax';
import { getGeolocation } from './openWeather';

// 取得天氣資料
export const getWeather = async() => await getGeolocation();

// 登入
export const login = async (value) => await ajax('/login', value);

// 登出
export const signOut = () => ajax('/signout');

// 取得 category 的資料
export const getCategoryList = async () => await ajax('/category/get');

// 修改 category 分類名
export const updateCategory = async (value) => await ajax('/category/update', value)

// 刪除 category 分類名
export const deleteCategory = async (value) => await ajax('/category/remove', value)

// 添加 category 資料
export const addCategoryData = async (value) => await ajax('/category/add', value);

// 取得 product 的資料
export const getProductList = async ( pageNum = 1, PageSize = 5,searchItem = { type: '', content: '' }) => await ajax('/product', {pageNum, PageSize, searchItem});

// 更改 product status的資料
export const changeProductStatus = async (value) => await ajax('/product/status', value);

// 新增 product
// 新增 product 圖片
export const addProductPicture = async (file) => await ajax('/product/pictureUpload', file);

// 刪除圖片
export const removeProductPicture = async (name) => await ajax('/product/pictureRemove', name);

// 添加商品
export const addProduct = async (value) => await ajax('/product/add', value);

// 取得單一商品資料
export const getSingleProduct = async (id) => await ajax('/product/single', id);

export const updateSingleProduct = async (value) => await ajax('/product/single/update', value);

// 取得角色資料
export const getRoleList = async () => await ajax('/role');

// 取得特定角色資料
export const getSingleRoleList = async (id) => await ajax('/role/single', id);

// 創建角色資料
export const createRole = async (name) => await ajax('/role/add', name);

// 更改 role authority 的資料
export const changeRoleAuthority = async (value) => await ajax('/role/update/authority', value);

// 取得角色資料
export const getUserList = async () => await ajax('/user');

// 創建使用者資料
export const createUser = async (value) => await ajax('/user/add', value);

// 修改使用者資料
export const changeUser = async (value) => await ajax('/user/update', value)

// 刪除使用者資料
export const removeUser = async (value) => await ajax('/user/remove', value)