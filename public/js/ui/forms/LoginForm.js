/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState('user-logged') и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, response) => {
      if (response.success) {
        App.getForm('login').element.reset()  // Очистка формы
        App.getModal('login').close()   // Закрывает окно
        App.setState('user-logged')   // Меняет страницу, user залогинился
      } else {
        console.error(response.error)
      }
    })
  }
}
