/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  console.log(options)
  const xhr = new XMLHttpRequest()


  if (options === 'GET') {
    console.log('Метод GET')
  }

};
