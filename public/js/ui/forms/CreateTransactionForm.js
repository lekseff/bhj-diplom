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
    this.renderAccountsList()

  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let fragment = new DocumentFragment()

    Account.list({}, (err, response)=> {
      if(response && response.success) {
        response.data.forEach(elem => {
          let optionsItem = document.createElement('option')
          optionsItem.setAttribute('value', `${elem.id}`)
          optionsItem.innerText = elem.name
          fragment.append(optionsItem)
        })
      }
      // console.log('render opt:', this.element.querySelector('.accounts-select'))
      this.element.querySelector('.accounts-select').prepend(fragment)
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    console.log('Transaction', data)
    Transaction.create(data, (err, response) => {
      console.log('response', response)
      if (response.success) {
        App.update()
      }
    })
  }
}
