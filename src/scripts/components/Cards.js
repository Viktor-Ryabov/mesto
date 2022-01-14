export class Card {
  //принимает в конструктор её данные и селектор её template-элемента;
  constructor(
    data,
    user,
    template,
    imagePopup,
    deleteCardHandler,
    addLikeCardHandler,
    deleteLikeCardHandler
  ) {
    this._data = data;
    this._user = user;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._template = template;
    this._imagePopup = imagePopup;
    this._cardElement = this._getTamplate();
    this._imagePopupButton = this._cardBaseElement.querySelector(".elements__picture"),
    this._deleteCardHandler = deleteCardHandler;
    this._likeCardHandler = likeCardHandler;
    this._likeCounter = this._cardBaseElement.querySelector(".elements__like-counter");
    this._addLikeCardHandler = addLikeCardHandler;
    this._deleteLikeCardHandler = deleteLikeCardHandler;
  }

  //**содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
  //*клонируем шаблон карточки
  _getTamplate(){
    const card = document
    .querySelector(this._template)
    .cloneNode(true)
    .querySelector(".card");
    return card;
  }

  //* удаляем элемент
  _deleteCard(){
    this._cardElement.remove();
  }

  //* добавляем лайк
  //* удаляем лайк
  //* считаем количество лайков
  //* проеряем кто создатель карточки
  //* проверяем есть ли лайк от личного аккаунта
  //* устанавливаем слушатели
  //* удаляем значок корзинки 



//содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
  createCard(){
  //* клонировать элемент
  //* назначить картинку
  //* назначить описание
  //* назначтить кнопку лайк
  //* назначить кнопку удаления
  //* назначить счётчик
  //* поставить данные для счётчика
  //* слушатель лайка
  //* слушатель удаления
  //* слушатель открытия попапа
  }
}