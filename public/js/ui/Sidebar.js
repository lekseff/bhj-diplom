/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    this.button = document.querySelector('.sidebar-toggle')
    this.button.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-collapse')
      document.body.classList.toggle('sidebar-open')
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регистрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState('init')
   * */
  static initAuthLinks() {
    document.querySelectorAll('#sidebar-menu li a')
      .forEach(elem => {
        elem.addEventListener('click', () => {

          if (elem.parentElement.classList.contains('menu-item_login')) {
            App.getModal('login').open()
          } else if (elem.parentElement.classList.contains('menu-item_register')) {
            App.getModal('register').open()
          } else if (elem.parentElement.classList.contains('menu-item_logout')) {
            User.logout((err, response) => {
              if (response.success) {
                App.setState('init')
              }
            })
          }
        })
      })
  }
}
