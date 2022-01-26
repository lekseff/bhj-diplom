/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  console.log('Параметры запроса: ', options)
  const xhr = new XMLHttpRequest()
  xhr.responseType = options.responseType

  // для POST login/register
  if(options.method === 'POST') {
    console.log('Вызван POST')

    xhr.open(options.method, options.url)

    const formData = new FormData()
    for (let key in options.data) {
      formData.append(key, options.data[key])
    }

    xhr.onload = () => {
      console.log('Response POST: ', xhr.response)
      options.callback(null, xhr.response)
    }

    xhr.onerror = () => {
      console.error('Data loading error')
    }

    xhr.send(formData)
  }
  // Для получения
  if(options.method === 'GET') {
    console.log('Вызван GET')

    let paramString = ''
    for(let key in options.data) {
      paramString += `&${key}=${options.data[key]}`
    }
    const resulUrl = options.url + '?' + paramString.slice(1)

    xhr.open(options.method, resulUrl)

    xhr.onload =() => {
      console.log('Ответ GET', xhr.response)
      options.callback(null, xhr.response)
    }


    xhr.send()
  }

};
