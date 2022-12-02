

const API_KEY = 'ba8a29562c22f982c837f087d414ba7a'
const link = "http://api.openweathermap.org"
const kelvin = 0;





// function getGeolocation(){
//   if(!navigator.geolocation){
//     app.innerHTML = "Geolocation is not supported"
//   }else{
//     navigator.geolocation.getCurrentPosition(showPosition)
//   }
// }

// function showPosition(position){
//   app.innerHTML = `Location: ${position.coords.latitude} ${position.coords.longitude}`
// }



function geoFind() {
  const app = document.getElementById('app')
  const status = document.getElementById('status')

  function success(position){
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    status.textContent = ''
    fetchData(latitude,longitude)
  }

  function error(){
    status.textContent = 'Невозможно получить ваше местоположение'
  }

  if(!navigator.geolocation){
    status.textContent = 'Геолокация не поддерживается вашим браузером'
  } else {
    navigator.geolocation.getCurrentPosition(success, error)
  }

}
geoFind()

let store = {
  temp: 0,
  tempMax: 0,
  tempMin: 0,
  feelsLike: 0,
  humidity: 0,
  lat: 0,
  lon: 0,
}

function convertToCel(deg) {
  const kelvin = 273.15
  let result = Math.trunc(deg - kelvin)
  return result
}

let stat = response => {
  if (response.status !== 200) {
    return Promise.reject(new Error(response.status))
  }
  return Promise.resolve(response)
}

let json = response => {
  return response.json()
}


const fetchData = async (lat,lon) => {
  // let result = await fetch(`${link}/geo/1.0/direct?q=Moscow&appid=${API_KEY}`)
  // let data = await result.json()

  // let {
  //   0: { lat: lat, lon: lon }
  // } = data

  let result = await fetch(`${link}/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&appid=${API_KEY}`)
    .then(stat)
    .then(json)
    .then(data => {
      let {
        main: {
          temp: temp,
          feels_like: feelsLike,
          humidity: humidity,
          temp_max: tempMax,
          temp_min: tempMin,
        },
        name: city
      } = data

      store = {
        ...store,
        city: city,
        temp: convertToCel(temp),
        tempMax: convertToCel(tempMax),
        tempMin: convertToCel(tempMin),
        feelsLike: convertToCel(feelsLike),
        humidity: humidity,
        lat: lat,
        lon: lon,
      }

      console.log(store)
    })
    .catch(error => {
      console.log(error)
    })




  // console.log(`Город: ${city}`)
  // console.log(`Температура: ${convertToCel(temp)}°`)
  // console.log(`Ощущается: ${convertToCel(feelsLike)}°`)
  // console.log(`Максимальная температура: ${convertToCel(tempMax)}°`)
  // console.log(`Минимальная температура: ${convertToCel(tempMin)}°`)
  // console.log(`Влажность: ${humidity}%`)









}








