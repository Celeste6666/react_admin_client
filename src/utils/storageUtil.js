export const saveStorage = (value) => {
  sessionStorage.setItem('user', JSON.stringify(value));
}
export const getStorage = () => {
  sessionStorage.getItem('user')
}
export const removeStorage = () => {
  sessionStorage.removeItem('user')
}