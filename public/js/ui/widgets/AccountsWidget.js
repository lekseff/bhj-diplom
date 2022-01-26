/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    try {
      this.element = element
      this.update()
      this.registerEvents()
    } catch (err) {
      console.error('Элемент не существует', err.message)
    }

  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      const createButton = event.target.closest('.create-account')
      const accountButton = event.target.closest('.account')

      if (createButton) {
        App.getModal('createAccount').open()
      }
      if (accountButton) {
        this.onSelectAccount(accountButton)
      }
    })
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const currentUser = User.current()
    if (currentUser) {
      Account.list(currentUser, (err, response) => {
        if (response && response.success) {
          this.clear()
          this.renderItem(response.data)
        }
      })
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = this.element.querySelectorAll('.account')
    if (accounts.length) {
      accounts.forEach(elem => {
        elem.remove()
      })
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage('transactions', {account_id: id_счёта});
   * */
  onSelectAccount(element) {
    this.element.querySelectorAll('.account')
      .forEach(elem => {
      if (elem.classList.contains('active')) {
        elem.classList.remove('active')
      }
    })
    const userId = User.current().id
    const accountId = element.dataset.id
    element.classList.add('active')
    App.showPage('transactions', {[userId]: accountId})
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    let element = document.createElement('li')
    element.classList.add('account')
    element.dataset.id = item.id
    element.innerHTML = `
         <a href="#">
           <span>${item.name}</span> /
           <span>${item.sum} ₽</span>
         </a>
    `
    return element
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    data.forEach(elem => {
      this.element.append(this.getAccountHTML(elem))
    })
  }
}
