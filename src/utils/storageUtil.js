export const saveStorage = (value) => {
  sessionStorage.setItem('user', JSON.stringify(value));
}
export const getStorage = () => {
  return JSON.parse(sessionStorage.getItem('user'));
}
export const removeStorage = () => {
  sessionStorage.removeItem('user')
}