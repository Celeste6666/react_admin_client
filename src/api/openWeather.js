const key = process.env.REACT_APP_OPENWEATHER_APIKEY;
const getWeather = async (lat,lon) => {
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=zh_tw&appid=${key}`
  const res = await fetch(weatherAPI);
  if(res && res.ok){
    return res
  }
}

export const getGeolocation = () => {
  return new Promise((resolve, reject) => {
    const success = async (pos) => {
      const { coords } = pos;
      const {latitude, longitude} = coords;
      const res = await getWeather(latitude, longitude);
      if(!res.ok) {
        resolve('資料取得錯誤')
      } else {
        const weather = await res.json();
        resolve(weather);
      }
    }
  
    const error = (err) => {
      console.warn('ERROR(' + err.code + '): ' + err.message)
      reject(err)
    }
  
    navigator
    .geolocation
    .getCurrentPosition(
      success,
      error)
  })
}