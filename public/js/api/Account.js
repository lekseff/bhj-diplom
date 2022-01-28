/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {

  static URL = '/account'

  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    console.log(id)
    createRequest({
      url: this.URL + '/' + id.account_id,
      method: 'GET',
      responseType: 'json',
      // id,
      callback: (err, response) => {
        //**
        callback(err, response)
      }
    })

  }
}
