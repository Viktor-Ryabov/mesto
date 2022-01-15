import { PopupWithImage } from "./PopupWithImage";

export default class Card {
    constructor(cardTitle, cardImage, cardLikes, cardOwnerId, cardId, userId, apiRyabov, bigImages) {
        this._cardTitle = cardTitle;
        this._cardImage = cardImage;
        this._userId = userId;
        this._cardOwnerId = cardOwnerId;
        this._likesArray = cardLikes;
        this._cardId = cardId;
        this._cardsApi = apiRyabov;
        this._cardBigImage = bigImages;
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

    _getTemplate() {
        const cardElement = document.querySelector("#newCardTemplate").content.querySelector(".card").cloneNode(true);
        return cardElement;
    }

    _deleteCard() {
        this._element.remove();
        this._cardsApi.deleteCardsAPI(this._cardId);
    }

    _setEventListeners() {
        this._element.querySelector(".card__button-like").addEventListener("click", () => {
            this._likeHandler();
        });
        this._element.querySelector(".card__foto").addEventListener("click", () => {
            this._cardBigImage.renderBigImages(this._cardImage, this._cardTitle);
        });
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
        if (!likeHeart.classList.contains("card__button-like_active")) {
            this._cardsApi
                .putLikesAPI(this._cardId)
                .then((res) => {
                    likeCount.textContent = res.likes.length;
                    likeHeart.classList.add("card__button-like_active");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this._cardsApi
                .deleteLikesAPI(this._cardId)
                .then((res) => {
                    likeCount.textContent = res.likes.length;
                    likeHeart.classList.remove("card__button-like_active");
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
                if (user._id === this._cardOwnerId) {
                    this._element.querySelector(".card__button-like").classList.add("card__button-like_active");
                }
            });
        } else {
            this._element.querySelector(".card__number-of-likes").textContent = 0;
        }
    }
}
