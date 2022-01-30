/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  // console.log('Начальные параметры запроса: ', options)
  const xhr = new XMLHttpRequest()
  xhr.responseType = options.responseType

  // Для получения GET
  if (options.method === 'GET') {
    // console.log('Вызван GET')
    let paramString = ''
    for (let elem in options.data) {
      const key = encodeURIComponent(elem)
      const value = encodeURIComponent(options.data[key])
      paramString += `&${key}=${value}`
    }

    const resulUrl = options.url + '?' + paramString.slice(1)
    xhr.onload = () => {
      // console.log('Ответ GET', xhr.response)
      options.callback(null, xhr.response)
    }
    xhr.onerror =() => {
      options.callback(xhr.response, null )
      console.error('Data loading error')
    }
    try {
      xhr.open(options.method, resulUrl)
      xhr.send()
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  } else {

    // для POST/PUT/DELETE
    // console.log(`Запрос вызван методом ${options.method}`)
    const formData = new FormData()
    for (let key in options.data) {
      formData.append(key, options.data[key])
    }
    xhr.onload = () => {
      options.callback(null, xhr.response)
    }
    xhr.onerror = () => {
      options.callback(xhr.response, null )
      console.error('Data loading error')
    }
    try {
      xhr.open(options.method, options.url)
      xhr.send(formData)
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }
};
