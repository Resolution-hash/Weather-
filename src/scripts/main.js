

const API_KEY = 'ba8a29562c22f982c837f087d414ba7a'
const link = ['http://api.openweathermap.org/geo/1.0/direct?q=', 'https://api.openweathermap.org/data/2.5/forecast?']
const month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const animationElemmetns = document.querySelectorAll('.animation')
const snowFlake_1 = document.getElementById('snow-1')
const snowFlake_2 = document.getElementById('snow-2')
const rain = document.getElementById('rain')
const cloud = document.getElementById('cloud')
const snowDescription = "снег"
const snowDescriptionSmall = "небольшой снег"
const rainDescription = "дождь"
const rainDescriptionSmall = "небольшой дождь"
const cloudDescription = "пасмурно"
const cloudDescriptionSmall = "облачно с прояснениями"
const cloudDescriptionSmall1 = "переменная облачность"
const cloudDescriptionSmall2 = "небольшая облачность"




let store = {
  city: '',
  lat: 0,
  lon: 0,
  timeOfDay: 'd',

  updateLocation: function (city, lat, lon) {
    this.city = city
    this.lat = lat.toFixed(2)
    this.lon = lon.toFixed(2)
  },

  updateTimeOfDay: function (pod) {
    this.timeOfDay = pod
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
    this.background = options.background
  }

  updateIndicators(description, temp, tempMax, tempMin, feelsLike, humidity, date, icon, pod) {
    this.description.textContent = description
    this.temp.textContent = addDeg(convertToCel(temp))
    this.tempMax.textContent = addDeg(convertToCel(tempMax))
    this.tempMin.textContent = addDeg(convertToCel(tempMin))
    this.feelsLike.textContent = addDeg(convertToCel(feelsLike))
    this.humidity.textContent = addPer(humidity)
    this.date.textContent = dateTransform(date)
    this.icon.src = `./images/${icon}.png`
    this.background.classList.add(this.checkTimeOfDay(pod))
  }

  updateIndicatorsNext(description, temp, date, icon) {
    this.description.textContent = description
    this.temp.textContent = addDeg(convertToCel(temp))
    this.date.textContent = dateTransform(date)
    this.icon.src = `./images/${icon}.png`
  }

  checkWeather(description) {

    switch (description) {
      case snowDescription:
        snowFlake_1.classList.remove('disable')
        snowFlake_2.classList.remove('disable')
        break
      case snowDescriptionSmall:
        snowFlake_1.classList.remove('disable')
        snowFlake_2.classList.remove('disable')
        break
      case rainDescription:
        rain.classList.remove('disable')
        break
      case rainDescriptionSmall:
        rain.classList.remove('disable')
        break
      case cloudDescription:
        cloud.classList.remove('disable')
        break
      case cloudDescriptionSmall:
        cloud.classList.remove('disable')
      case cloudDescriptionSmall1:
        cloud.classList.remove('disable')
        break
      case cloudDescriptionSmall2:
        cloud.classList.remove('disable')
        break

    }
  }
  checkTimeOfDay(pod) {
    const weatherHeder = document.querySelectorAll('.weather-header')
    const formInput = document.getElementById('form-input')
    const button = document.getElementById('button')
    if (pod === 'n') {
      currentDay.background.classList.remove('day')
      setfont('font-night', 'font-night-secondary')
      setBorderColor(weatherHeder, 'border-night')
      formInput.classList.add('border-night')
      button.classList.add('border-night')
      button.classList.add('font-night-secondary')
      return 'night'
    } else {
      currentDay.background.classList.remove('night')
      setfont('font-day', 'font-day-secondary')
      unsetBorderColor(weatherHeder, 'border-night')
      formInput.classList.remove('border-night')
      button.classList.remove('border-night')
      button.classList.remove('font-night-secondary')
      return 'day'
    }

    function setBorderColor(elem, className) {
      elem.forEach((el) => {
        el.classList.add(className)
      })
    }

    function unsetBorderColor(elem, className) {
      elem.forEach((el) => {
        el.classList.remove(className)
      })
    }

    function setfont(className, classNameSecondary, classNameBorder) {
      const formLabel = document.getElementById('form-label')
      const weatherTitle = document.querySelectorAll('.weather-footer__title')
      const body = document.body
      const classDay = 'font-day-secondary'
      const classNight = 'font-night-secondary'



      for (let i = 0; i < weatherTitle.length; i++) {
        if (weatherTitle[i].classList.contains(classDay)) {
          weatherTitle[i].classList.remove(classDay)
        } else if (weatherTitle[i].classList.contains(classNight)) {
          weatherTitle[i].classList.remove(classNight)
        }
        weatherTitle[i].classList.add(classNameSecondary)
      }

      if (formLabel.classList.contains(classDay)) {
        formLabel.classList.remove(classDay)
      } else if (formLabel.classList.contains(classNight)) {
        formLabel.classList.remove(classNight)
      }

      if (formInput.classList.contains(classDay)) {
        formInput.classList.remove(classDay)
      } else if (formInput.classList.contains(classNight)) {
        formInput.classList.remove(classNight)
      }

      formLabel.classList.add(classNameSecondary)
      formInput.classList.add(classNameSecondary)
      formInput.classList.toggle(classNameBorder)
      body.classList.remove(...body.classList)
      body.classList.add(className)
    }

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
  icon: document.getElementById('current-icon'),
  background: document.getElementById('main')
})

const tomorrowDay = new Day({
  description: document.getElementById('tomorrow-description'),
  temp: document.getElementById('tomorrow-temp'),
  date: document.getElementById('tomorrow-date'),
  icon: document.getElementById('tomorrow-icon')
})


const tomorrowAfterDay = new Day({
  description: document.getElementById('tomorrowAfter-description'),
  temp: document.getElementById('tomorrowAfter-temp'),
  date: document.getElementById('tomorrowAfter-date'),
  icon: document.getElementById('tomorrowAfter-icon')
})


function geoFind() {
  const app = document.getElementById('app')
  const status = document.getElementById('status')

  function success(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    status.textContent = ''
    fetchData(latitude, longitude)
  }

  function error() {
    status.textContent = 'Невозможно получить местоположение'
  }

  if (!navigator.geolocation) {
    status.textContent = 'Геолокация не поддерживается вашим браузером'

  } else {
    navigator.geolocation.getCurrentPosition(success, error)
  }

}
geoFind()

const fetchData = async (lat, lon) => {
  let result = await fetch(`${link[1]}lat=${lat}&lon=${lon}&lang=ru&appid=${API_KEY}`)
    .then(stat)
    .then(json)
    .then(data => {
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
            },
            sys: {
              pod
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
      currentDay.updateIndicators(description, temp, tempMax, tempMin, feelsLike, humidity, date, icon, pod)
      currentDay.checkWeather(description)
      tomorrowDay.updateIndicatorsNext(tomorrowDescription, tomorrowTemp, tomorrowDate, tomorrowIcon)
      tomorrowAfterDay.updateIndicatorsNext(tomorrowAfterTempDescription, tomorrowAfterTemp, tomorrowAfterDate, tomorrowAfterIcon)
      dateTransform(date)
    })
    .catch(error => {
      console.log(error)
    })
}

const fetchCity = async (place) => {
  setClassDisable()
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
            },
            sys: {
              pod
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
      currentDay.updateIndicators(description, temp, tempMax, tempMin, feelsLike, humidity, date, icon, pod)
      currentDay.checkWeather(description)
      tomorrowDay.updateIndicatorsNext(tomorrowDescription, tomorrowTemp, tomorrowDate, tomorrowIcon)
      tomorrowAfterDay.updateIndicatorsNext(tomorrowAfterTempDescription, tomorrowAfterTemp, tomorrowAfterDate, tomorrowAfterIcon)
      dateTransform(date)
    })
}

document.forms.checkWeather.onsubmit = function (e) {
  e.preventDefault()
  const inputVal = document.getElementById('form-input')
  fetchCity(inputVal.value)
  inputVal.value = ''
}

function labelSet(value) {
  const labelVal = document.getElementById('label-city')
  labelVal.textContent = value
}


function dateTransform(data) {
  let date = data.slice(0, 10)
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

function setClassDisable() {
  animationElemmetns.forEach((elem) => {
    elem.classList.add('disable')
  })
}


document.body.onload = function () {
  setTimeout(function () {
    {
      let preloader = document.getElementById('page-preloader')
      if (!preloader.classList.contains('done')) {
        preloader.classList.add('done')
      }
    }
  }, 1000)
}



