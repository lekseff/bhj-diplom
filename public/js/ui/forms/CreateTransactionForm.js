/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    // this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let fragment = new DocumentFragment()
    Account.list({}, (err, response) => {
      if (response.success) {
        response.data.forEach(elem => {
          let optionsItem = document.createElement('option')
          optionsItem.setAttribute('value', `${elem.id}`)
          optionsItem.innerText = elem.name
          fragment.append(optionsItem)
        })
      }
      const select = this.element.querySelector('.accounts-select')
      // Очистка списка
      while (select.firstChild) {
        select.removeChild(select.firstChild)
      }
      //Добавление элементов
      select.prepend(fragment)
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    const type = data.type[0].toUpperCase() + data.type.slice(1)
    Transaction.create(data, (err, response) => {
      if (response.success) {
        // Закрывает активное окно
        App.getModal(`new${type}`).close()
        // Сбрасываем форму
        App.getForm(`create${type}`).element.reset()
        // Обовляем App
        App.update()
      } else {
        console.error(response.error)
        alert(response.error)
      }
    })
  }
}
