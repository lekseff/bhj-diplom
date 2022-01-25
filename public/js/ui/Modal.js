/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    this.element = element

    this.registerEvents()
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    this.element.querySelectorAll('button[data-dismiss="modal"]')
      .forEach(elem => {
      elem. addEventListener('click', this.onClose.bind(this))
    })
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    // const activeModal = e.target.closest('div.modal')
    // console.log('onClose')
    this.close()
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    // console.log('open')
    this.element.style.display = "block"
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    // console.log('close')
    this.element.style.display = 'none'

  }
}
