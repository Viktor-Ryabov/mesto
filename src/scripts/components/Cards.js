import { cardsContainer, template } from "../utils/constants.js";
import { Api } from "./Api.js";

export default class Card {
    constructor(cardTitle, cardImage, cardLikes, cardOwnerId, cardId, userId) {
        this._cardTitle = cardTitle;
        this._cardImage = cardImage;
        this._userId = userId;
        this._cardOwnerId = cardOwnerId;
        this._likesArray = cardLikes;
        this._cardId = cardId;
    }

    _getTemplate() {
        const cardElement = document.querySelector("#newCardTemplate").content.querySelector(".card").cloneNode(true);
        return cardElement;
    }

    cardGenerator() {
        this._element = this._getTemplate();
        this._element.querySelector(".card__foto").src = `${this._cardImage}`;
        this._element.querySelector(".card__title").textContent = `${this._cardTitle}`;
        this._setEventListeners();
        this._deleteCardHandlerDeactivate();
        this._checkInitialLikes();

        return this._element;
    }

    _deleteCard() {
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector(".card__button-like").addEventListener("click", () => {
            this._likeHandler();
        });
        this._element.querySelector(".card__foto").addEventListener("click", () => {
            console.log("BIG_IMAGE!!!");
        }); // запускает функцию приравнивания картинки в карточке к картинке в попапе с большим изображением
        this._element.querySelector("#deleteButton").addEventListener("click", () => {
            this._deleteCard();
        });
    }

    _deleteCardHandlerDeactivate() {
        if (this._cardOwner !== this._userId) {
            this._element.querySelector("#deleteButton").remove(); //удаляем прям элемент корзинки
        }
    }

    _likeHandler() {
        const likeHeart = this._element.querySelector(".card__button-like");
        const likeCount = this._element.querySelector(".card__number-of-likes");
        console.log(`BIG Like for ${this._cardTitle}`);
        if (!likeHeart.classList.contains("card__button-like_active")) {
            Api.putLikesAPI(this._cardId)
                .then((res) => {
                    likeCount.textContent = this._likesArray.length;
                    likeHeart.classList.toggle("card__button-like_active");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            Api.deleteLikesAPI(this._cardId)
                .then((res) => {
                    likeCount.textContent = this._likesArray.length;
                    likeHeart.classList.toggle("card__button-like_active");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    _checkInitialLikes() {
        if (this._likesArray) {
            this._element.querySelector(".card__number-of-likes").textContent = this._likesArray.length;
            this._likesArray.forEach((user) => {
                if (user._id === this.userId) {
                    this._likeButton.classList.add("card__button-like_active");
                }
            });
        }
    }
}

// const addLike = (event) => {
//     const likeHeart = event.target;
//     const likesContainer = likeHeart.closest(".element__likes");
//     const currentCard = likeHeart.closest(".element");
//     const likeCount = likesContainer.querySelector(".element__like-count");
//     const cardId = currentCard.id;

//     if (!likeHeart.classList.contains("card__button-like_active")) {
//         sendLike(cardId)
//             .then((res) => {
//                 likeCount.textContent = res.likes.length;
//                 likeHeart.classList.toggle("card__button-like_active");
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     } else {
//         deleteLike(cardId)
//             .then((res) => {
//                 likeCount.textContent = res.likes.length;
//                 likeHeart.classList.toggle("card__button-like_active");
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }
// };

// export class Card {
//     //принимает в конструктор её данные и селектор её template-элемента;
//     constructor(cardsData, userId) {
//         this.cardsData = cardsData;
//         this.userId = userId;

//         // this._cardId = data._id;
//         // this._cardOwnerId = data.owner._id;
//         // this._template = template;
//         // this._imagePopup = imagePopup;
//         this._cardElement = this._getTamplate();
//         // this._deleteCardHandler = deleteCardHandler;
//         // this._likeCardHandler = likeCardHandler;
//         // this._likeCounter = this._cardElement.querySelector(".elements__like-counter");
//         // this._likeButton = this._cardElement.querySelector(".card__button-like");

//         // this._addLikeCardHandler = addLikeCardHandler;
//         // this._deleteLikeCardHandler = deleteLikeCardHandler;
//     }

//     //**содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
//     //*клонируем шаблон карточки

//     //* удаляем элемент

//     //** Частные функции
//     //* добавляем лайк
//     //* удаляем лайк
//     //* считаем количество лайков
//     //* проеряем кто создатель карточки
//     //* проверяем есть ли лайк от личного аккаунта
//     //* устанавливаем слушатели
//     //* удаляем значок корзинки

//     //**содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.

//     _createCard() {
//         this._getTamplate();

//         const cardElement = this._getTamplate();
//         //* клонировать элемент - назначено в константах
//         //* назначить картинку
//         const cardImage = this._cardElement.querySelector(".elements__picture");
//         //* назначить описание, ссылку
//         cardImage.alt = `${this._data.name}`;
//         cardImage.src = `${this._data.link}`;
//         //* назначтить кнопку лайк
//         const initialLikeHeart = cardElement.querySelector(".card__button-like");
//         const likeCount = cardElement.querySelector(".card__number-of-likes");
//         //* назначить кнопку удаления
//         const bucket = cardElement.querySelector("#deleteButton");

//         cardElement.owner = cardOwner;
//         cardElement.id = cardId;
//         cardElement.querySelector(".element__title").textContent = сardTitle;

//         _checkInitialLikes(initialLikeHeart);

//         //* назначить счётчик
//         //* поставить данные для счётчика
//         //* слушатель лайка
//         //* слушатель удаления
//         //* слушатель открытия попапа

//         _setEventListeners();

//         return this._cardElement;
//     }

//     _setEventListeners(cardElement) {
//         cardElement.querySelector(".card__button-like").addEventListener("click", addLike);
//         cardElement.querySelector(".card__foto").addEventListener("click", renderingImage); // запускает функцию приравнивания картинки в карточке к картинке в попапе с большим изображением
//         cardElement.querySelector("#deleteButton").addEventListener("click", confirming);
//     }

//     _deleteCardHandlerDeactivate() {
//         if (this._cardOwnerId !== this._userId) {
//             this.cardElement.querySelector("#deleteButton").remove(); //удаляем прям элемент корзинки
//         }
//     }

//     _checkInitialLikes() {
//         if (this._CardsData) {
//             this._CardsData.forEach((user) => {
//                 if (user._id === userId) {
//                     this._likeButton.classList.add("card__button-like_active");
//                 }
//             });
//         }
//     }
// }

// export const createCard = (сardTitle, cardImage, initialLikes, cardOwner, cardId) => {
//     const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
//     const initialLikeHeart = cardElement.querySelector(".element__like");
//     const likeCount = cardElement.querySelector(".element__like-count");
//     likeCount.textContent = initialLikes.length;
//     const bucket = cardElement.querySelector(".element__delete");
//     cardElement.owner = cardOwner;
//     cardElement.id = cardId;
//     cardElement.querySelector(".element__title").textContent = сardTitle;
//     cardImg.src = cardImage;
//     cardImg.alt = сardTitle;

//     if (cardOwner !== currentUserId) {
//         bucket.classList.add("element__delete_deactive");
//     }
//     if (initialLikes) {
//         initialLikes.forEach((user) => {
//             if (user._id === currentUserId) {
//                 initialLikeHeart.classList.add("card__button-like_active");
//             }
//         });
//     } else {
//         likeCount.textContent = 0;
//     }
// };
