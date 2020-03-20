//спасибо за терпение, и что все так объяснили, я реально путаюсь с этими кетч и классами еще, трудновато понять как все это должно работать,
// и трудно еще привыкнуть к последовательности работы с сервером, что сначала хапрос нужно потом то что вернулось уже как-то прменить и тд + асинхрон, в общем еще раз спасибо,
// я не специально такой тупой
// а это я еще доп задания не успел сделать :(

// Думаю что как раз лучше попробовать доп. задания сделать, чтобы руку набить. Хотя, если вы сейчас все поняли, то будет несложно.


class Api {
  // отлично что нет хардкода с url токеном, а данные передаются в конструктор.
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;


  }
  // возвращает карточки с сервера
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(`Ошибка: ${err.message}`);
      });
  }
  // загружает инфу о пользователе
  loadInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(`Ошибка: ${err.message}`);
      });
  }
  //обновляет информацию о пользователе
  updateUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(`Ошибка: ${err.message}`);
      });
  }

  // Добавление новой карточки

  addNewCard (name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res)=> {
      if(res.ok) {
        return res.json();
      } return Promise.reject(`Error: ${res.status}`);
    })
  }
  // Удаление карточки
  deleteCard (id) {
    return fetch(`${this.baseUrl}/cards/${id}`,{
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } throw `Error: ${res.status}`;
    })
  }

  likeCard (id) {
    return fetch(`${this.baseUrl}/cards/like/${id}`,{
      method: 'PUT',
      headers: this.headers
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } throw `Error: ${res.status}`;
    })
  }

  deletelikeCard (id) {
    return fetch(`${this.baseUrl}/cards/like/${id}`,{
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      } throw `Error: ${res.status}`;
    })
  }

  changeAvatar(url) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: url
      })
    })
    .then((res)=> {
      if(res.ok){
        return res.json();
      } throw `Error: ${res.statusText}`;
    })
  }
}

