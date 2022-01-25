/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState('user-logged')
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    console.log('Регистрация: ', data)

    //При успешной регистрации
    // App.setState('user-logged')
    // Очистка формы
    // App.getForm('register').element.reset()
    // Закрытие формы
    // App.getModal('register').close()
  }
}
