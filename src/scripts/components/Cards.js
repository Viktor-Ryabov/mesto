export default class Card {
    constructor(cardTitle, cardImage, cardLikes, cardOwnerId, cardId, userData, apiRyabov, bigImages, cardTemplate, popupDeleteConfirming) {
        this._cardTitle = cardTitle;
        this._cardImage = cardImage;
        this._userId = userData._id;
        this._cardOwnerId = cardOwnerId;
        this._likesArray = cardLikes;
        this._cardId = cardId;
        this._cardsApi = apiRyabov;
        this._cardBigImage = bigImages;
        this._cardTemplate = cardTemplate;
        this._deletingPopup = popupDeleteConfirming;
    }

    cardGenerator() {
        this._element = this._getTemplate();
        this._element.querySelector(".card__foto").src = `${this._cardImage}`;
        this._element.querySelector(".card__foto").alt = `${this._cardTitle}`;
        this._element.querySelector(".card__title").textContent = `${this._cardTitle}`;
        this._setEventListeners();
        this._deleteCardHandlerDeactivate();
        this._checkInitialLikes();

        return this._element;
    }

    _getTemplate() {
        const cardElement = this._cardTemplate.content.querySelector(".card").cloneNode(true);
        return cardElement;
    }

    _deleteCard() {
        this._deletingPopup.changeButtonOnLoad(true);
        this._cardsApi
            .deleteCardsAPI(this._cardId)
            .then(() => {
                this._element.remove();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                this._deletingPopup.changeButtonOnLoad(false);
                this._deletingPopup.removeEventListener("submit", this._deleteCard);
            });
    }

    _deleteConfirmPopupHandler() {
        this._deletingPopup.openPopup();
        // Нужно добавить класс попапа подтверждения удаления со слушателем события кнопки в попапе подтверждения, которая запустит _deleteCard()
    }

    _setEventListeners() {
        this._element.querySelector(".card__button-like").addEventListener("click", () => {
            this._likeHandler();
        });
        this._element.querySelector(".card__foto").addEventListener("click", () => {
            this._cardBigImage.renderBigImages(this._cardImage, this._cardTitle);
        });
        this._element.querySelector("#deleteButton").addEventListener("click", () => {
            this._deleteConfirmPopupHandler();
        });
    }

    _deleteCardHandlerDeactivate() {
        if (this._cardOwnerId !== this._userId) {
            const bucket = this._element.querySelector("#deleteButton");
            bucket.remove(); //удаляем прям элемент корзинки
        }
    }

    _likeHandler() {
        const likeHeart = this._element.querySelector(".card__button-like");
        const likeCount = this._element.querySelector(".card__number-of-likes");
        if (!likeHeart.classList.contains("card__button-like_active")) {
            this._cardsApi
                .putLikesAPI(this._cardId)
                .then((res) => {
                    const numOfLikes = res.likes.length;
                    likeCount.textContent = numOfLikes;
                    likeHeart.classList.add("card__button-like_active");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this._cardsApi
                .deleteLikesAPI(this._cardId)
                .then((res) => {
                    const numOfLikes = res.likes.length;
                    likeCount.textContent = numOfLikes;
                    likeHeart.classList.remove("card__button-like_active");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    _checkInitialLikes() {
        const likeHeart = this._element.querySelector(".card__button-like");
        const likeCount = this._element.querySelector(".card__number-of-likes");
        if (this._likesArray !== 0) {
            likeCount.textContent = this._likesArray.length;
            this._likesArray.forEach((user) => {
                if (user._id === this._userId) {
                    likeHeart.classList.add("card__button-like_active");
                }
            });
        } else {
            this._element.querySelector(".card__number-of-likes").textContent = 0;
        }
    }
}
