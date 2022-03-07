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
export const deleteCategory = async (value) => await ajax('/category/delete', value)

// 添加 category 資料
export const addCategoryData = async (value) => await ajax('/category/add', value);

