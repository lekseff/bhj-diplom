/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  console.log('Параметры запроса: ', options)

  const xhr = new XMLHttpRequest()
  xhr.responseType = options.responseType


  // Для получения GET
  if(options.method === 'GET') {
    console.log('Вызван GET')

    let paramString = ''
    for(let elem in options.data) {
      const key = encodeURIComponent(elem)
      const value = encodeURIComponent(options.data[key])
      paramString += `&${key}=${value}`
    }

    const resulUrl = options.url + '?' + paramString.slice(1)

    xhr.open(options.method, resulUrl)

    xhr.onload =() => {
      console.log('Ответ GET', xhr.response)
      options.callback(null, xhr.response)
    }
    xhr.send()
  } else {

    // для POST/PUT login/register
    // if(options.method === 'POST') {
    console.log(`Запрос вызван методом ${options.method}`)

    xhr.open(options.method, options.url)

    const formData = new FormData()
    for (let key in options.data) {
      formData.append(key, options.data[key])
    }

    xhr.onload = () => {
      // console.log('Response POST: ', xhr.response)
      options.callback(null, xhr.response)
    }

    xhr.onerror = () => {
      console.error('Data loading error')
    }

    xhr.send(formData)
    // }
  }

};
