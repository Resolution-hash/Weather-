

const API_KEY = 'ba8a29562c22f982c837f087d414ba7a'
const link = ['http://api.openweathermap.org/geo/1.0/direct?q=', 'https://api.openweathermap.org/data/2.5/forecast?']
const month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']


// const destDecription = document.getElementById('current-description')
// const destTemp = document.getElementById('current-temp')
// const destTempMax = document.getElementById('current-max')
// const destTempMin = document.getElementById('current-min')
// const destFeelsLike = document.getElementById('current-feelsLike')
// const desthumidity = document.getElementById('current-humidity')
// const destDate = document.getElementById('current-date')

let today = new Date()

let store = {
  city: '',
  lat: 0,
  lon: 0,

  updateLocation: function (city, lat, lon) {
    this.city = city
    this.lat = lat.toFixed(2)
    this.lon = lon.toFixed(2)
  }
}

class Day {
  constructor(options) {
    this.description = options.description,
    this.temp = options.temp,
    this.date = options.date
    this.tempMax = options.tempMax,
    this.tempMin = options.tempMin,
    this.feelsLike = options.feelsLike,
    this.humidity = options.humidity
    this.icon = options.icon
  }

  updateIndicators(description, temp, tempMax, tempMin, feelsLike, humidity, date, icon) {
    this.description.textContent = description
    this.temp.textContent = addDeg(convertToCel(temp))
    this.tempMax.textContent = addDeg(convertToCel(tempMax))
    this.tempMin.textContent = addDeg(convertToCel(tempMin))
    this.feelsLike.textContent = addDeg(convertToCel(feelsLike))
    this.humidity.textContent = addPer(humidity)
    this.date.textContent = dateTransform(date)
    this.icon.src = `./images/${icon}.png`
  }

  updateIndicatorsNext(description, temp, date, icon) {
    this.description.textContent = description
    this.temp.textContent = addDeg(convertToCel(temp))
    this.date.textContent = dateTransform(date)
    this.icon.src = `./images/${icon}.png`
  }

}




const currentDay = new Day({
  description: document.getElementById('current-description'),
  temp: document.getElementById('current-temp'),
  tempMax: document.getElementById('current-max'),
  tempMin: document.getElementById('current-min'),
  feelsLike: document.getElementById('current-feelsLike'),
  humidity: document.getElementById('current-humidity'),
  date: document.getElementById('current-date'),
  icon: document.getElementById('current-icon')
})

console.log(currentDay)


const tomorrowDay = new Day({
  description: document.getElementById('tomorrow-description'),
  temp: document.getElementById('tomorrow-temp'),
  date: document.getElementById('tomorrow-date'),
  icon: document.getElementById('tomorrow-icon')
})
console.log(tomorrowDay)


const tomorrowAfterDay = new Day({
  description: document.getElementById('tomorrowAfter-description'),
  temp: document.getElementById('tomorrowAfter-temp'),
  date: document.getElementById('tomorrowAfter-date'),
  icon: document.getElementById('tomorrowAfter-icon')
})

console.log(tomorrowAfterDay)

// const currentDay = {
//   temp: document.getElementById('current-temp'),
//   description: document.getElementById('current-description'),
//   tempMax: document.getElementById('current-max'),
//   tempMin: document.getElementById('current-min'),
//   feelsLike: document.getElementById('current-feelsLike'),
//   humidity: document.getElementById('current-humidity'),
//   date: document.getElementById('current-date')
// }




// function geoFind() {
//   const app = document.getElementById('app')
//   const status = document.getElementById('status')

//   function success(position){
//     const latitude = position.coords.latitude
//     const longitude = position.coords.longitude

//     status.textContent = ''
//     fetchData(latitude,longitude,place)
//   }

//   function error(){
//     status.textContent = 'Невозможно получить ваше местоположение'
//   }

//   if(!navigator.geolocation){
//     status.textContent = 'Геолокация не поддерживается вашим браузером'

//   } else {
//     navigator.geolocation.getCurrentPosition(success, error)
//   }

// }
// geoFind()

// const fetchData = async (latitude, longitude, place) => {
//   result = await fetch(`${link}/data/2.5/weather?lat=${store.lat}&lon=${store.lon}&lang=ru&appid=${API_KEY}`)
//     .then(stat)
//     .then(json)
//     .then(data => {
//       let {
//         main: {
//           temp: temp,
//           feels_like: feelsLike,
//           humidity: humidity,
//           temp_max: tempMax,
//           temp_min: tempMin,
//         }
//       } = data

//       store = {
//         ...store,
//         temp: convertToCel(temp),
//         tempMax: convertToCel(tempMax),
//         tempMin: convertToCel(tempMin),
//         feelsLike: convertToCel(feelsLike),
//         humidity,
//       }

//       console.log(store)
//     })
//     .catch(error => {
//       console.log(error)
//     })

// }

const fetchCity = async (place) => {
  let result = await fetch(`${link[0]}${place}&appid=${API_KEY}`)
  let data = await result.json()
  let {
    0: { lat: lat, lon: lon, name: city }
  } = data
  store.updateLocation(city, lat, lon)

  result = await fetch(`${link[1]}lat=${store.lat}&lon=${store.lon}&lang=ru&appid=${API_KEY}`)
    .then(stat)
    .then(json)
    .then(data => {
      console.log(data)
      let {
        city: {
          name
        },
        list:
        {
          0: {
            main: {
              temp,
              humidity,
              feels_like: feelsLike,
              temp_max: tempMax,
              temp_min: tempMin,
            },
            dt_txt: date,
            weather: {
              0: {
                description,
                icon
              }
            }
          },
          8: {
            main: {
              temp: tomorrowTemp
            },
            dt_txt: tomorrowDate,
            weather: {
              0: {
                description: tomorrowDescription,
                icon: tomorrowIcon
              }
            }
          },
          16: {
            main: {
              temp: tomorrowAfterTemp
            },
            dt_txt: tomorrowAfterDate,
            weather: {
              0: {
                description: tomorrowAfterTempDescription,
                icon: tomorrowAfterIcon
              }
            }
          }
        }
      } = data
      labelSet(name)
      currentDay.updateIndicators(description, temp, tempMax, tempMin, feelsLike, humidity, date, icon)
      tomorrowDay.updateIndicatorsNext(tomorrowDescription, tomorrowTemp, tomorrowDate, tomorrowIcon)
      tomorrowAfterDay.updateIndicatorsNext(tomorrowAfterTempDescription, tomorrowAfterTemp, tomorrowAfterDate, tomorrowAfterIcon)
      console.log(currentDay)
      console.log(tomorrowDay)
      console.log(tomorrowAfterDay)
      dateTransform(date)
    })

  // result = await fetch(`${link[1]}lat=${store.lat}&lon=${store.lon}&appid=${API_KEY}`)
  //   .then(stat)
  //   .then(json)
  //   .then(data => {
  //     let {
  //       weather: [
  //         {
  //           description: description,
  //         }
  //       ],
  //       main: {
  //         temp: temp,
  //         feels_like: feelsLike,
  //         humidity: humidity,
  //         temp_max: tempMax,
  //         temp_min: tempMin,
  //       }
  //     } = data
  //     store.updateIndicators(description, temp, tempMax, tempMin, feelsLike, humidity)
  //     updateWeather(place)

  //     console.log(store)
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
}

document.forms.checkWeather.onsubmit = function (e) {
  e.preventDefault()
  const inputVal = document.getElementById('form-input')
  fetchCity(inputVal.value)
  inputVal.value = ''
}

function labelSet(value) {
  console.log(value)
  const labelVal = document.getElementById('label-city')
  labelVal.textContent = value
  console.log(1)
}

// const updateWeather = function (value) {
//   // label update
//   const content = ucFirst(value)
//   labelVal.textContent = content
//   //temp update
//   currentDay.temp.textContent = addDeg(store.temp)
//   //tempMax update
//   currentDay.tempMax.textContent = addDeg(store.tempMax)
//   //tempMin update
//   currentDay.tempMin.textContent = addDeg(store.tempMin)
//   //description update
//   currentDay.description.textContent = store.description
//   //humidity update
//   currentDay.humidity.textContent = addPer(store.humidity)
//   //feelsLike update 
//   currentDay.feelsLike.textContent = addDeg(store.feelsLike)
// }

// function updateDate(date) {
//   let currentMonth = ''

//   const currentDay = today.getUTCDate()
//   const currentYear = today.getFullYear()

//   for (let i = 0; i < month.length; i++) {
//     let value = today.getMonth()
//     currentMonth = month[value]
//   }
//   date.textContent = `${currentMonth} ${currentDay}, ${currentYear}`

// }
// updateDate(currentDay.date)
function dateTransform(data) {
  let date = data.slice(0, 10)
  console.log(date)
  const current_year = date.slice(0, 4)
  let current_month = date.slice(5, 7)
  let current_day = date.slice(8, 10)

  if (!current_month.startsWith('0')) {
    current_month = monthSort(current_month)
  } else {
    current_month = current_month.charAt(1)
    current_month = monthSort(current_month)
  }

  if (current_day.startsWith('0')) {
    current_day = current_day.charAt(1)
  }

  function monthSort(current_month) {
    let result
    for (let i = 0; i < month.length; i++) {
      result = month[current_month - 1]
    }
    return result
  }

  date = `${current_month} ${current_day}, ${current_year}`
  return date

}

function convertToCel(deg) {
  const kelvin = 273.15
  let result = Math.trunc(deg - kelvin)
  return result
}

function addDeg(content) {
  return content + '°C'
}

function addPer(content) {
  return content + '%'
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

function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}










