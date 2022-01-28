/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    // data {name: 123}
    Account.create(data, (err, response) => {
      console.log('Ответ на создание счета: ', response)
      if (response && response.success) {
        App.getForm('createAccount').element.reset()
        App.getModal('createAccount').close()
        App.update()
      } else {
        console.error(response.error)
        alert(response.error)
      }
    })
  }
}
