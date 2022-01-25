/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  console.log('Параметры запроса: ', options)
  const xhr = new XMLHttpRequest()
  xhr.responseType = options.responseType

  // для POST login
  xhr.open(options.method, options.url)

  const formData = new FormData()
  for (let key in options.data) {
    formData.append(key, options.data[key])
  }

  xhr.onload = () => {
    console.log('Response: ', xhr.response)
    options.callback(null, xhr.response)
  }

  xhr.onerror = () => {
    console.error('Data loading error')
  }

  xhr.send(formData)
};
