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
    // console.log(data)
    User.login(data)

    //Если все ОК
    // Меняет страницу, user залогинился
    // App.setState('user-logged')

    // Очистка формы
    // App.getForm('login').element.reset()

    // Закрывает окно
    // App.getModal('login').close()
  }
}
