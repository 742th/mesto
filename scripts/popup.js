// создает объект попаппа, вешает слушатель на кнопку закрыть и метод открывашки
class Popup {
    constructor(popup) {
        this.popup = popup;
        this.popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    }
    open(event) {
        this.popup.classList.add('popup_is-opened');

    }

    close(event) {
        event.target.closest('.popup').classList.remove('popup_is-opened');
    }
}



// Нужно исправить: Каждому классу надо создавать отдельный файл, чтобы по названию было понятно что в этом файле лежит определённый класс 


