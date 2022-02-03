/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (element) {
      this.element = element
      this.registerEvents()
      this.lastOptions = null
    } else {
      throw new Error('Не верно передан элемент (TransactionsPage)')
    }
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (this.lastOptions) this.render(this.lastOptions)
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.querySelector('.remove-account').addEventListener('click', () => {
      this.removeAccount()
    })

    this.element.querySelector('.content').addEventListener('click', (event) => {
      const element = event.target.closest('button.transaction__remove')
      if (element) {
        this.removeTransaction(element.dataset.id)
      }
    })
  }

  /**
   * Удаляет счёт. Необходимо показать диалоговое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {
      if (confirm("Вы действительно хотите удалить счет?")) {
        const id = this.lastOptions.account_id
        Account.remove({id}, (err, response) => {
          if(response.success) {
            this.clear()
            App.update()
          }
        })
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждения действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {
    if (confirm('Удалить транзакцию?')) {
      Transaction.remove({id}, (err, response) => {
        if (response.success) {
          App.update()
        }
      })
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (!options) throw new Error('Не передан options (TransactionsPage.render)')
    this.clear()
    this.lastOptions = options
    Account.get(options, (err, response) => {
        if (response.success) {
          this.renderTitle(response.data.name)
        }
      }
    )
    Transaction.list(options, (err, response) => {
      if (response.success) {
        this.renderTransactions(response.data)
      }
    })
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.lastOptions = null
    this.renderTransactions([])
    this.renderTitle('Название счета')
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    this.element.querySelector('.content-title').innerText = name
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    const mounts = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    date = new Date(date).toLocaleString()    //10.03.2019, 03:20:41

    let [dateDate, dateTime] = date.split(', ')
    dateDate = dateDate.split('.')
    dateTime = dateTime.split(':')

    const [day, mount, year] = dateDate
    const [hour, minute] = dateTime

    return `${day} ${mounts[mount - 1]} ${year} г. в ${hour}:${minute}`
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    const date = this.formatDate(item.created_at) //10 марта 2019 г. в 03:20
    const element = document.createElement('div')
    element.className = `transaction transaction_${item.type} row`

    const elementDetails = document.createElement('div')
    elementDetails.className = 'col-md-7 transaction__details'
    elementDetails.innerHTML = `
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">${item.name}</h4>
              <!-- дата -->
              <div class="transaction__date">${date}</div>
          </div>
    `
    const elementSum = document.createElement('div')
    elementSum.classList.add('col-md-3')
    elementSum.innerHTML = `
          <div class="transaction__summ">
              ${item.sum} <span class="currency">₽</span>
          </div>
    `

    const elementControls = document.createElement('div')
    elementControls.className = 'col-md-2 transaction__controls'
    elementControls.innerHTML = `
            <button class="btn btn-danger transaction__remove" data-id="${item.id}">
               <i class="fa fa-trash"></i>  
            </button>
    `

    element.append(elementDetails)
    element.append(elementSum)
    element.append(elementControls)
    return element
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    const content = this.element.querySelector('.content')

    if (data.length === 0) {
      while (content.firstChild) {
        content.removeChild(content.firstChild)
      }
    } else {
      const fragment = new DocumentFragment()
      data.forEach(elem => {
        fragment.append(this.getTransactionHTML(elem))
      })
      content.append(fragment)
    }
  }
}
