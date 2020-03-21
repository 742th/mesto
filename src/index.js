import './style.css';
// import img from '../images/close.svg';
// import imglikea from '../images/like-active.svg';
// import imglike from '../images/like-inactive.svg';
// import imglogo from '../images/logo.svg';
// import imgtrash from '../images/trash-icon.svg';

import {Api} from '../scripts/api.js';
import {Card} from '../scripts/card.js';
import {CardList} from '../scripts/cardList.js';
import {FormValid} from '../scripts/FormValid.js';
import {Popup} from '../scripts/popup.js';
import {PopupImg} from '../scripts/popupEx.js';
import {UserInfo} from '../scripts/UserInfo.js';


// ПЕРЕМЕННЫЕ
const root = document.querySelector('.root');
const placesList = root.querySelector('.places-list');
const openButton = root.querySelector('.user-info__button');
const popup = root.querySelector('.popup');
const formCard = document.forms.new;
const name = formCard.elements.name;
const link = formCard.elements.link;
const editButton = root.querySelector('.user-info__btn');
const popupEdit = root.querySelector('.popup_edit');
const formEdit = document.forms.add;
const nameEdit = formEdit.elements.myName;
const aboutEdit = formEdit.elements.about;
const imya = root.querySelector('.user-info__name');
const job = root.querySelector('.user-info__job');
const popupImg = root.querySelector('.popup_img');
const imgOp = root.querySelector('.popup_img-op');
const logo = root.querySelector('.user-info__photo');
const popupAv = root.querySelector('.popup_ava');
const formAva = document.forms.ava;
const avatar = formAva.elements.avatar;



//ошибки для валидации
const errors = {
  tooShort: 'Должно быть от 2 до 30 символов',
  tooLong: 'Должно быть от 2 до 30 символов',
  missInput: 'Это обязательное поле',
  noError: ''
}


// ОБЪЕКТЫ

const card = new Card();
// Можно лучше -- адрес и токун лучше вынести в отдельные константы
const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort8',
  headers: {
    authorization: 'bea6708b-d9ac-4fb2-9c3f-0da05735cb87',
    'Content-Type': 'application/json'
  }
});
// создает контейнер с карточками начальными и добавляет новые к остальным
const cartonki = new CardList(placesList, card, formCard, api);
formCard.addEventListener('submit', cartonki.buttonAdd.bind(cartonki));

api.getInitialCards()
  .then(res => cartonki.render(res))
  .catch((err) => {
    console.log(err);
  });


// попапычи
const pepupEd = new Popup(popupEdit);
const pepup = new Popup(popup);
const pepupIm = new PopupImg(popupImg);
const pepupAv = new Popup(popupAv);

//открывашки
editButton.addEventListener('click', pepupEd.open.bind(pepupEd));
openButton.addEventListener('click', () => pepup.open());
placesList.addEventListener('click', pepupIm.openIm.bind(pepupIm));
logo.addEventListener('click',pepupAv.open.bind(pepupAv));

// вешаем валидацию на формы
const formValid = new FormValid(formEdit, errors);
const formCardVal = new FormValid(formCard, errors);
const formAvVal = new FormValid(formAva, errors);

// обработка формы юзера
const userinfo = new UserInfo(formEdit, api, imya, job, logo, formAva);

// Можно лучше -- вообще этот запрос лучше было бы делать сразу изнутри метода newData, там данные обработать,
// а потом из него же вызвать this.render()
api.loadInfo()
  .then((info) => {
    userinfo.newData(info.name, info.about, info.avatar, info._id);
    userinfo.render();
  })


formEdit.addEventListener('submit', userinfo.updateUserInfo.bind(userinfo));
formAva.addEventListener('submit', userinfo.buttonChangeAva.bind(userinfo));


