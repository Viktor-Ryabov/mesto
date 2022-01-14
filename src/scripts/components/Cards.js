export class Card {
  //принимает в конструктор её данные и селектор её template-элемента;
  constructor(
    initialCardsData,
    userId,
    template,
    imagePopup,
    deleteCardHandler,
    addLikeCardHandler
  ) {
    this._initialCardsData = initialCardsData;
    this.userId = userId;

    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._template = template;
    this._imagePopup = imagePopup;
    this._cardElement = this._getTamplate();
    this._deleteCardHandler = deleteCardHandler;
    this._likeCardHandler = likeCardHandler;

    this._likeCounter = this._cardElement.querySelector(".elements__like-counter");
    this._likeButton = this._cardElement.querySelector(".card__button-like");

    this._addLikeCardHandler = addLikeCardHandler;
    this._deleteLikeCardHandler = deleteLikeCardHandler;
    
  }

  //**содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
  //*клонируем шаблон карточки
  _getTamplate() {
    const card = document
      .querySelector(this._template)
      .cloneNode(true)
      .querySelector(".card");
    return card;
  }

  //* удаляем элемент
  _deleteCard() {
    this._cardElement.remove();
  }

  //** Частные функции
  //* добавляем лайк
  //* удаляем лайк
  //* считаем количество лайков
  //* проеряем кто создатель карточки
  //* проверяем есть ли лайк от личного аккаунта
  //* устанавливаем слушатели
  //* удаляем значок корзинки

  //**содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
  createCard() {
    debugger
    this._getTamplate();
    const cardElement = this._getTamplate();
    //* клонировать элемент - назначено в константах
    //* назначить картинку
    const cardImage = this._cardElement.querySelector(".elements__picture");
    //* назначить описание, ссылку
    cardImage.alt = `${this._data.name}`;
    cardImage.src = `${this._data.link}`;
    //* назначтить кнопку лайк
    const initialLikeHeart = cardElement.querySelector(".card__button-like");
    const likeCount = cardElement.querySelector(".card__number-of-likes");
    //* назначить кнопку удаления
    const bucket = cardElement.querySelector("#deleteButton");

    cardElement.owner = cardOwner;
    cardElement.id = cardId;
    cardElement.querySelector(".element__title").textContent = сardTitle;

    _checkInitialLikes(initialLikeHeart);

    //* назначить счётчик
    //* поставить данные для счётчика
    //* слушатель лайка
    //* слушатель удаления
    //* слушатель открытия попапа

    _setEventListeners();

    return this._cardElement;
  }

  _setEventListeners(cardElement) {
    cardElement
      .querySelector(".card__button-like")
      .addEventListener("click", addLike);
    cardElement
      .querySelector(".card__foto")
      .addEventListener("click", renderingImage); // запускает функцию приравнивания картинки в карточке к картинке в попапе с большим изображением
    cardElement
      .querySelector("#deleteButton")
      .addEventListener("click", confirming);
  }

  _deleteCardHandlerDeactivate() {
    if (this._cardOwnerId !== this._userId) {
      this.cardElement.querySelector("#deleteButton").remove(); //удаляем прям элемент корзинки
    }
  }

  _checkInitialLikes() {
    if (this._initialCardsData) {
      this._initialCardsData.forEach((user) => {
        if (user.owner._id === userId) {
          
          
          this._likeButton.classList.add("card__button-like_active");
        }
      });
    }
  }
}

export const createCard = (
  сardTitle,
  cardImage,
  initialLikes,
  cardOwner,
  cardId
) => {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const initialLikeHeart = cardElement.querySelector(".element__like");
  const likeCount = cardElement.querySelector(".element__like-count");
  likeCount.textContent = initialLikes.length;
  const bucket = cardElement.querySelector(".element__delete");
  cardElement.owner = cardOwner;
  cardElement.id = cardId;
  cardElement.querySelector(".element__title").textContent = сardTitle;
  cardImg.src = cardImage;
  cardImg.alt = сardTitle;

  if (cardOwner !== currentUserId) {
    bucket.classList.add("element__delete_deactive");
  }
  if (initialLikes) {
    initialLikes.forEach((user) => {
      if (user._id === currentUserId) {
        initialLikeHeart.classList.add("element__like_active");
      }
    });
  } else {
    likeCount.textContent = 0;
  }
};
